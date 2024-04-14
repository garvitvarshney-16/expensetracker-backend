import Express from "express"
import { calculateMonthlyExpenditure, generateCategoryComparisons, getRecentTransaction } from "../controllers/transactionAnalysis.controller.js"

const router = Express.Router()

router.get("/calculateMonthlyExpenditure", calculateMonthlyExpenditure)
router.get("/generateCategoryComparisons", generateCategoryComparisons)
router.get("/getRecentTransaction", getRecentTransaction);



export default router;