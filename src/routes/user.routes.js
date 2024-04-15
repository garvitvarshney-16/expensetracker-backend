import Express from "express"
import { deleteUser, getUserDetails, signInUser, updateUser } from "../controllers/user.controller.js"

const router = Express.Router()

router.post("/signin", signInUser)
router.put("/updateDetail/:id", updateUser)
router.get("/:id", getUserDetails)
router.delete("/:id", deleteUser)


export default router