import Leave from "../model/Leave.js";
import Employee from "../model/Employee.js";
const addLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason, userId } = req.body;
    if(!leaveType ||!startDate ||!endDate ||!reason ||!userId){
      return res.status(400).json({message: "Bad request, all form field must not be empty"})
    }
    const empoyee = await Employee.find({ userId: userId });
    let employeeId = empoyee[0]._id;
    const newLeave = new Leave({
      leaveType,
      startDate,
      endDate,
      reason,
      employeeId,
    });
    const saved = await newLeave.save();
    if (!saved) {
      return res.status(403).json({ message: "Error applying for new leave" });
    } 
    return res.status(201).json({ message: "Sucessful" });
  } catch (err) {
    res.status(500).json({ message: "Internal server errror" });
    console.log(err);
  }
};

const getUsersLeave = async (req, res) => {
  try {
    let leave;
    // This is trying to get employee by useerId sent from employee-dashboard
    const employee = await Employee.find({ userId: req.params.id });
    if (employee.length < 1) {
      // Getting the leave with the employeeId sent directly from the admin-dashboard
      leave = await Leave.find({employeeId: req.params.id})
    }else{
      // then the employeeId of that user is used to get the leave
      leave = await Leave.find({ employeeId: employee[0]._id });
    }
    return res.status(200).json(leave);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getLeaveList = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name",
        },
      ],
    });
    return res.status(200).json(leaves);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
    console.log(err);
  }
};

const getLeavesByLeavesId = async(req,res)=>{
    try{
        const leave = await Leave.findById({_id: req.params.id}).populate(
            {
                path: "employeeId",
                populate:[
                    {
                        path: "department",
                        select: "dep_name"
                    },
                    {
                        path: "userId",
                        select: ['name', 'profileImage']
                    }
                ]
            }
        )
        return res.status(200).json(leave)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:  "Internal server error"})
    }
}

const updateLeave = async(req, res)=>{
  try{
    const{id, status} = req.body
    const updateStatus = await Leave.findByIdAndUpdate({_id: req.params.id}, {status: status})
    if(!updateStatus){
      return res.status(404).json({message: "Leave not found"})
    }
    return res.status(200).json({message: "Status updated"})
  }
  catch(err){
    console.log(err)
    res.status(500).json({message: "Internal server error"})
  }
}
export { addLeave, getUsersLeave, getLeaveList, getLeavesByLeavesId, updateLeave };
