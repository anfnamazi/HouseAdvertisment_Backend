//Express.js configuration
const express = require("express");
const router = express.Router();

//swagger configuration
const swagger = require("swagger-ui-express");
const swaggerDoc = require('../swagger.json');

//All routes configuration
router.use("/auth", require("./auth"));
router.use("/map", require("./map"));
router.use("/user", require("./user"));

//intilize swagger document route
router.use("/docs", swagger.serve, swagger.setup(swaggerDoc));

router.all("*", (req, res, next) => {
    try {
        let error = new Error("صفحه مورد نظر یافت نشد!");
        error.statusCode = 404;
        next(error);
    } catch (err) {
        next(err);
    }
});

router.use((error, req, res, next) => {
    const code = error.statusCode || 500;
    const message = error.message || "خطایی رخ داده است";
    res.status(code).json({
        message
    });
});

module.exports = router;