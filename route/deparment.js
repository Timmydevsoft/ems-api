import { deleteDepartment, editDepartment, getById } from "../controller/departMentController.js"
import express from "express"
const departmentRouter = express.Router()
import veryfyUser from "../middleware/verifyuser.js"
import addDepartment, { getDepartment } from "../controller/departMentController.js"
departmentRouter.route("/department/add").post(veryfyUser,addDepartment)
departmentRouter.route("/departments").get(veryfyUser, getDepartment)
departmentRouter.route("/department/:id").get( veryfyUser,getById)
departmentRouter.route("/departments/:id").put(veryfyUser,editDepartment)
departmentRouter.route("/departments/:id").delete(veryfyUser, deleteDepartment)
export default departmentRouter