import mongoose, { Schema } from "mongoose";

const salarySchema = new mongoose.Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: "employee", required: true },
  basicSalary: { type: Number, required: true },
  allowances: { type: Number },
  deduction: { type: Number },
  netSalary: { type: Number },
  payDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now() },
});

const Salary = mongoose.model("salary", salarySchema);
export default Salary;
