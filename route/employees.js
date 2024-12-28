import express from "express"
import veryfyUser from "../middleware/verifyuser.js"
import {addEmployee, upload, getEmployees, getEmployeeById, updateEmployee, fetchEmployeeByDepId, fetchProfileByuserId} from "../controller/employeeController.js"
const employeeRouter = express.Router()
employeeRouter.route("/employee/add").post(veryfyUser, upload.single("image"), addEmployee)
employeeRouter.route("/employees").get(veryfyUser, getEmployees)
employeeRouter.route("/employee/:id").get(veryfyUser, getEmployeeById)
employeeRouter.route("/employee/edit/:id").put(veryfyUser, updateEmployee)
employeeRouter.route("/employee/department/:id").get(veryfyUser, fetchEmployeeByDepId)
employeeRouter.route("/employee/profile/:id").get(veryfyUser, fetchProfileByuserId)
export default employeeRouter
