import express from "express";
import usersController from "../controllers/Users";
const router = express.Router();

router.post("/login", usersController.login);
router.post("/getUserData", usersController.getUserData);
router.post("/register", usersController.register);

export default router;
