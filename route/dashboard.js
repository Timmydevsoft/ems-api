import express from 'express'
import veryfyUser from "../middleware/verifyuser.js"
import { getSummary } from '../controller/dashboardController.js'
const dashboardRouter = express.Router()
dashboardRouter.route("/dashboard").get(veryfyUser, getSummary)
export {dashboardRouter}