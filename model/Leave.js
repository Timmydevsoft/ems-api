import mongoose, { Schema } from "mongoose";

const leaveSchema = new mongoose.Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: "employee", required: true },
  // userId: {type:Schema.Types.ObjectId, ref: 'user', required: true},
  leaveType: {
    type: String,
    enum: ["Sick Leave", "Casual Leave", "Annual Leave"],
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ["Approved", "Pending", "Rejected"],
    default: "Pending",
  },
  ApplieddAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const Leave = mongoose.model("leave", leaveSchema);
export default Leave;
