import express from "express"
import veryfyUser from "../middleware/verifyuser.js"
import { addSalary, getSalaryById } from "../controller/salaryControlller.js"

const salaryRouter = express.Router()
salaryRouter.route("/salary/add").post(veryfyUser, addSalary)
salaryRouter.route("/salary/:id").get(veryfyUser,getSalaryById)
export default salaryRouter