import express from "express"
import veryfyUser from "../middleware/verifyuser.js"
// importc Login from "../controller/usersController.js"
import { createUser, Login, verify } from "../controller/usersController.js"
const router = express.Router()
router.route("/login").post(Login)
router.route("/create").post(createUser)
router.route("/verify").get(veryfyUser, verify)
export default router