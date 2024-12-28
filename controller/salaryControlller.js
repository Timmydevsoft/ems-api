import Salary from "../model/Salary.js"
import Employee from "../model/Employee.js"
const addSalary = async(req, res)=>{
    try{
        const{ employeeId, basicSalary, allowances, deduction, payDate} = req.body
        if(!employeeId || !basicSalary || !allowances || !deduction || !payDate){
            return res.status(500).json({message: "All field must be filled"})
        }
        let netSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deduction)
        const newSalary = new Salary({
            employeeId, basicSalary, allowances, deduction, netSalary, payDate
        })
        const saveNewSalary = await newSalary.save()
        if(!saveNewSalary){
            return res.status(400).json({message: "Error Adding neww salary"})
        }
       return  res.status(201).json({message: "Salary added successfully"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "Internal server error"})
    }
}

const getSalaryById = async(req, res)=>{
    // console.log(req.params.id)
    try{
        //Finding the employee salary by when employeeId is sent directly as params from front end
        
        const salary = await Salary.find({employeeId: req.params.id}).populate('employeeId', 'employeeId')
        if(salary.length === 0){
            //Finding the user's salary using the users's id sent as useparams fro the front end
            const employee = await Employee.findOne({userId: req.params.id})
            const userSalary = await Salary.find({employeeId: employee._id}).populate('employeeId', 'employeeId')
            if(userSalary.length === 0){
                console.log(userSalary)
                return res.json({message: "Salary not found"})
            }else{
                return  res.status(200).json(userSalary)
            }
             
        }
        res.status(200).json(salary)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "Internal server error"})
    }
}
export {addSalary, getSalaryById}