const express = require("express");
const router = express.Router();
const authorization = require("../validations/authorization");
const IsAdmin = require("../validations/isAdmin");
const userController = require("../controllers/userController");

router.get("/:id", authorization, IsAdmin, userController.getOneUserById);
router.get("/", authorization, IsAdmin, userController.getAll);
router.delete("/delete/:id", authorization, IsAdmin, userController.deleteOne);

module.exports = router;