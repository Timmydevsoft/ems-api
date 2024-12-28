import mongoose, { Schema } from "mongoose";
const employeeSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  employeeId: { type: String, required: true, unique: true },
  dob: { type: Date },
  gender: { type: String },
  maritalStatus: { type: String },
  designation: { type: String },
  department: {
    type: Schema.Types.ObjectId,
    ref: "department",
    required: true,
  },
  salary: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});
const Employee = mongoose.model("employee", employeeSchema);
export default Employee;
