import Express from "express"
import { deleteMonthlyExpenseGoal, getMonthlyExpenseGoal, setMonthlyExpenseGoal } from "../controllers/monthlyexpensegoal.controller.js";


const router = Express.Router()

router.post("/addMonthlyExpenseGoal", setMonthlyExpenseGoal);
router.post("/getMonthlyExpenseGoal", getMonthlyExpenseGoal);
router.delete("/deleteMonthlyExpenseGoal", deleteMonthlyExpenseGoal)


export default router;