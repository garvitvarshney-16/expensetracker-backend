import Express from "express"
import { calculateMonthlyExpenditure, generateCategoryComparisons } from "../controllers/transactionAnalysis.controller.js"

const router = Express.Router()

router.get("/calculateMonthlyExpenditure", calculateMonthlyExpenditure)
router.get("/generateCategoryComparisons", generateCategoryComparisons)



export default router;