import Department from "../model/Department.js"
import Employee from "../model/Employee.js"
import Leave from "../model/Leave.js"

const getSummary = async(req,res)=>{
    try{
        const totalEmployee = await Employee.countDocuments()
        const totalDepartment = await Department.countDocuments()
        const salaryTotal = await Employee.aggregate([
            {
                $group:{_id: null, totalSalary:{$sum: "$salary"}}
            }
        ])

        const employeeAppliedForLeave = (await Leave.distinct('employeeId'))
        const leaveStatus = await Leave.aggregate([
            {
                $group:{
                    _id: "$status",
                    count: {$sum: 1}
                }
            }
        ])

        const leaveSummary = {
            totalApplied: employeeAppliedForLeave.length,
            approved: leaveStatus.find((item)=> item._id ==="Approved")?.count || 0,
            rejected: leaveStatus.find((item)=> item._id ==="Rejected")?.count || 0,
            pending: leaveStatus.find((item)=> item._id ==="Pending")?.count || 0

        }
        return res.status(200).json(
            {
                totalEmployee, totalDepartment,salaryTotal,...leaveSummary
            }
        )

    }               
    catch(err){
        res.status(500).json({messsage: "Internal server error"})
        console.log(err)
    }
}
export {getSummary}