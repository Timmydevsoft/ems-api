import express from "express";
import veryfyUser from "../middleware/verifyuser.js";
import {
  addLeave,
  getUsersLeave,
  getLeaveList,
  getLeavesByLeavesId,
  updateLeave,
} from "../controller/leaveController.js";

const leaveRouter = express.Router();

//Adding or applying for new leaves by the employee
leaveRouter.route("/leave/add").post(veryfyUser, addLeave);

//Getting specific users leave list by using emloyee id from the employee dashboard
leaveRouter.route("/employee/leave/:id").get(veryfyUser, getUsersLeave);

// Getting all the list from the admin dashboard
leaveRouter.route("/leave").get(veryfyUser, getLeaveList);

// Getting the salary using the salaries id by admin
leaveRouter.route("/leave/:id").get(veryfyUser, getLeavesByLeavesId);

// Updating the leave status by the
leaveRouter.route("/leave/:id").put(veryfyUser, updateLeave);
export default leaveRouter;
