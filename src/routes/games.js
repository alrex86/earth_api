const express = require("express");
const router = express.Router();
const gameControllers = require("../controllers/games");

router.post("/country/create", gameControllers.createCountry);

module.exports = router;
