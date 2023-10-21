const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {

    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, { algorithm: "HS256" }, (error, decoded) => {
            if (error || !decoded.user) {
                const error = new Error("خطا در احراز هویت");
                error.statusCode = 401;
                throw error;
            }
            req.user = decoded.user;
            next();
        })
    }
    else {
        const error = new Error("خطا در احراز هویت");
        error.statusCode = 401;
        next(error);
    }
};


module.exports = authorization;