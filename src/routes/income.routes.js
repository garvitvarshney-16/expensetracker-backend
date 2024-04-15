import Express from "express"
import { addIncome, deleteIncome, getIncome, updateIncome } from "../controllers/income.controller.js";

const router = Express.Router();

router.post("/addIncome", addIncome);
router.put("/updateincome/:id", updateIncome);
router.get("/:userId", getIncome)
router.delete("/:id", deleteIncome)


export default router;