import Express from "express"
import { calculateMonthlyExpenditure, generateCategoryComparisons, getRecentTransaction } from "../controllers/transactionAnalysis.controller.js"

const router = Express.Router()

router.post("/calculateMonthlyExpenditure", calculateMonthlyExpenditure)
router.post("/generateCategoryComparisons", generateCategoryComparisons)
router.post("/getRecentTransaction", getRecentTransaction);



export default router;