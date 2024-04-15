import Express from "express"
import { addExpense, deleteExpense, getExpense, updateExpense } from "../controllers/expense.controller.js"

const router = Express.Router()


router.post("/addExpense", addExpense)
router.get("/getexpense/:userId", getExpense)
router.put("/updateexpense/:id", updateExpense)
router.delete("/deleteexpense/:id", deleteExpense)


export default router;