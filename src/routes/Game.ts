import express from "express";
import gameControllers from "../controllers/Game";

const router = express.Router();

router.post("/createCountry", gameControllers.createCountry);
router.post("/build", gameControllers.build);
router.post("/explore", gameControllers.research);

export default router;
