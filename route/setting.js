import express from "express"
import veryfyUser from "../middleware/verifyuser.js"
import { changePassword } from "../controller/settingsController.js"

//veryfyUser, 
const settingsRouter = express.Router()
settingsRouter.route("/settings").put(veryfyUser, changePassword)
export default  settingsRouter