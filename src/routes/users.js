const express = require("express");
const router = express.Router();
const usersController = require("./../controllers/users");

router.get("/:id", usersController.getUserById);
router.post("/login", usersController.login);
router.post("/register", usersController.register);
router.post("/getUserData", usersController.getUserData);

module.exports = router;
