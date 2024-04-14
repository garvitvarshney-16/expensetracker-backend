import Express from "express"
import { calculateMonthlySavings, calculateYearlySavings } from "../controllers/saving.controller.js"

const router = Express.Router()

router.post("/monthSaving", calculateMonthlySavings)
router.get("/yearlySaving", calculateYearlySavings)


export default router;