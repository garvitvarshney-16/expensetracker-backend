import Express from "express"
import { signInUser } from "../controllers/user.controller.js"

const router = Express.Router()

router.post("/signin", signInUser)


export default router