const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
class AuthController {

    async login(req, res, next) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                message: "اعتبارسنجی با شکست مواجه شد. اطلاعات وارد شده صحیح نیست!",
                errors: errors.array()
            });
        }

        const { username, password } = req.body;

        try {
            let user = await User.findOne({ username: username });
            if (!user) {
                let error = new Error("کاربری با این نام کاربری یافت نشد!");
                error.statusCode = 401;
                next(error);
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                let error = new Error("اطلاعات ورودی اشتباه است!");
                error.statusCode = 401;
                next(error);
            }
            const payload = {
                user: {
                    id: user.id,
                    isAdmin: user.isAdmin
                }
            };

            let accessToken = createAccessToken(payload);
            let refreshToken = createRefreshToken(payload);

            res.status(200).json({
                accessToken: accessToken,
                accessTokenExpiresIn: new Date(Date.now() + 1000 * 3600),
                refreshToken: refreshToken,
                refreshTokenExpiresIn: new Date(Date.now() + 172800000),
            });
        }
        catch (err) {
            next(err);
        }

    }

    async register(req, res, next) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                message: "اعتبارسنجی با شکست مواجه شد. اطلاعات وارد شده صحیح نیست!",
                errors: errors.array()
            });
        }

        const { username, password, email, fullname } = req.body;

        try {
            let user = await User.findOne({ username: username });
            if (user) {
                let error = new Error("این نام کاربری قبلا انتخاب شده است.");
                error.statusCode = 401;
                next(error);
            }

            user = new User({
                fullname,
                username,
                password,
                email
            });
            user.password = bcrypt.hashSync(password, 10);

            await user.save();

            const payload = {
                user: {
                    id: user.id,
                    isAdmin: user.isAdmin
                }
            };

            let accessToken = createAccessToken(payload);
            let refreshToken = createRefreshToken(payload);

            res.status(200).json({
                accessToken: accessToken,
                accessTokenExpiresIn: new Date(Date.now() + 1000 * 3600),
                refreshToken: refreshToken,
                refreshTokenExpiresIn: new Date(Date.now() + 172800000),
            });

        }
        catch (error) {
            next(error);
        }
    }

    async refresh(req, res, next) {
        if (typeof req.headers.authorization !== "undefined") {
            let token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET,
                { algorithm: "HS256" }, async (error, decoded) => {
                    if (error) {
                        const error = new Error("خطا در احراز هویت");
                        error.statusCode = 401;
                        next(error);
                    }

                    let user = await User.findOne({ _id: decoded.user.id });
                    let playload = {
                        user: user
                    }

                    let accessToken = createAccessToken(playload);

                    res.status(200).json({
                        accessToken: accessToken,
                        accessTokenExpiresIn: new Date(Date.now() + 60000 * 60)
                    });
                });
        }
        else {
            const error = new Error("خطا در احراز هویت");
            error.statusCode = 401;
            next(error);
        }
    }
}

const createAccessToken = (paylaod) => {
    let accessToken = jwt.sign(paylaod, process.env.ACCESS_TOKEN_SECRET,
        { algorithm: "HS256", expiresIn: "1h" });
    return accessToken;
}

const createRefreshToken = (payload) => {
    let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256", expiresIn: "172800000ms"
    });
    return refreshToken;
}

module.exports = new AuthController;