import Express from "express"
import { addIncome } from "../controllers/income.controller.js";

const router = Express.Router();

router.post("/addIncome", addIncome);


export default router;