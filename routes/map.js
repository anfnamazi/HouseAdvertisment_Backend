//Express.js Framework configuation
const express = require("express");
const router = express.Router();

//import controller
const MapController = require("../controllers/MapController");

//Validation config
const authorization = require("../validations/authorization");
const checkMapOwnership = require("../validations/checkMapOwnership");
const mapValidator = require("../validations/mapValidator");

//GET (get all maps)
router.get("/", MapController.getAll);

//GET (get single map by id)
router.get("/:id", MapController.getById);

//GET (get map by page)
router.get("/page/:page", MapController.getByPage);

//POST (create new map)
router.post("/create", authorization, mapValidator.create(), MapController.createMap);

//PUT (update a map data)
router.put("/update/:id", authorization, mapValidator.update(), checkMapOwnership, MapController.updateOne);

//Delete (delete a map)
router.delete("/delete/:id", authorization, checkMapOwnership, MapController.deleteOne);

module.exports = router;