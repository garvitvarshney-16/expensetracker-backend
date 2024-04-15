import Express from "express";
import { suggestTips } from "../controllers/AIModel/model.js";

const router = Express.Router();

router.post("/generate", suggestTips);

export default router;
