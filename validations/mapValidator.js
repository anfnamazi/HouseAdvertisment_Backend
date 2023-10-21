const { body } = require("express-validator");

class MapValidator {
    create = () => {
        return [
            body('latitude', "لتیتود باید از جنس عدد باشد").isNumeric(),
            body('longitude', "لانگیتود باید از جنس عدد باشد").isNumeric(),
            body('address', "آدرس باید حداقل ۵ کاراکتر باشد").trim().isString().isLength({ min: 5 }),
            body('phone', "تلفن نباید خالی باشد").trim().notEmpty(),
            body('phone', "تلفن باید حداکثر ۱۱ کاراکتر باشد").trim().isLength({ max: 11 })
        ];
    }
    update = () => {
        return [
            body('latitude', "لتیتود باید از جنس عدد باشد").isNumeric(),
            body('longitude', "لانگیتود باید از جنس عدد باشد").isNumeric(),
            body('address', "آدرس باید حداقل ۵ کاراکتر باشد").trim().isString().isLength({ min: 5 }),
            body('phone', "تلفن نباید خالی باشد").trim().notEmpty(),
            body('phone', "تلفن باید حداکثر ۱۱ کاراکتر باشد").trim().isLength({ max: 11 })
        ];
    }
}

module.exports = new MapValidator;