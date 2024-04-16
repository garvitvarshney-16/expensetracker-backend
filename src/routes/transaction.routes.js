import Express from "express"
import { calculateMonthlyExpenditure, generateCategoryComparisons, getCurrentYearFinancialData, getRecentTransaction } from "../controllers/transactionAnalysis.controller.js"

const router = Express.Router()

router.post("/calculateMonthlyExpenditure", calculateMonthlyExpenditure)
router.post("/generateCategoryComparisons", generateCategoryComparisons)
router.post("/getRecentTransaction", getRecentTransaction);
router.post("/financialData/:userId", getCurrentYearFinancialData)



export default router;