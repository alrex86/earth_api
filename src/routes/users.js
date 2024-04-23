const express = require("express");
const router = express.Router();
const usersController = require("./../controllers/users");

// router.get("/:id", usersController.getUserById);
// router.get("/:id/:countryId", usersController.getUserData);
// router.post("/login", usersController.login);
router.post("/register", usersController.register);

module.exports = router;
