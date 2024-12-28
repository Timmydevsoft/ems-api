import Department from "../model/Department.js"
const addDepartment = async(req, res)=>{
    try{
        const {dep_name, description} = req.body
        if(!dep_name || !description){
            return res.status(400).json({message: "department name or description can't be empty"})
        }
        const addNewDepartment = await  Department.create({dep_name, description})
        const saved = await addNewDepartment.save()
        if(saved){
            res.status(201).json({message: "Department added successfully"})
        }
    }
    catch(err){
        res.status(500).json({error: err.message})
        console.log(err)
    }
}
export default addDepartment
export const getDepartment = async(req,res)=>{
    try{
        const departments = await Department.find()
        return res.status(200).json({departments})
    }
    catch(err){
        res.status(500).json({message: "Internal server error"})
        console.log(err)
    }
}

export const getById = async(req, res)=>{
    try{
        const department = await Department.findById({_id: req.params.id})
        if(!department){
            res.status(404).json({message: "Not found"})
        }
        return res.status(200).json(department)
    }
    catch(err){

    }
}

export const editDepartment= async(req,res)=>{
    try{
        const {dep_name, description} = req.body
        if(!dep_name || !description){
            return res.status(400).json({message: "department name or description can't be empty"})
        }
        const update = await Department.findByIdAndUpdate(
            req.params.id,
            {
                dep_name, 
                description
            }
        );
        if(update){
            return res.status(201).json({message: "Successful"})
        }
    }
    catch(err){
        console.log(err)
    }
}

export const deleteDepartment = async(req, res)=>{
    try{
        const deleteDep = await Department.findById({_id: req.params.id})
        await deleteDep.deleteOne()
        return res.status(200).json({message: "Successful"})
    }
    catch(err){
        console.log(err)
    }
}