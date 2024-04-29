const express = require("express");
const router = express.Router();
const gameControllers = require("../controllers/games");

router.post("/country/create", gameControllers.createCountry);
router.post("/country/build", gameControllers.build);

module.exports = router;
