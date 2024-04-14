import Express from "express"
import { addExpense } from "../controllers/expense.controller.js"

const router = Express.Router()


router.post("/addExpense", addExpense)

export default router;