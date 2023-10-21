const { body } = require("express-validator");
class AuthValidators {
    loginValidation = () => {
        return [
            body("username", "نام کاربری وارد نشده است").notEmpty(),
            body("password", "رمز عبور وارد نشده است").notEmpty()
        ];
    }

    registerValidation = () => {
        return [
            body("username", "نام کاربری وارد نشده است").notEmpty(),
            body("password", "رمز عبور وارد نشده است").notEmpty(),
            body("email", "ایمیل وارد نشده است").notEmpty(),
            body("fullname", "نام و نام خانوادگی وارد نشده است").notEmpty()
        ];
    }
}

module.exports = new AuthValidators;