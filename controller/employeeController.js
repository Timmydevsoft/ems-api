import Employee from "../model/Employee.js";
import User from "../model/User.js";
import multer from "multer";
import bcrypt from "bcrypt";
import path from "path";
import Department from "../model/Department.js";
/*const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});
const addEmployee = async (req, res) => {
  const {
    emp_name,
    mail,
    employee_id,
    date_of_birth,
    gender,
    marital_status,
    designation,
    department,
    salary,
    password,
    role,
    image,
  } = req.body;

  try {
    if (
      (!emp_name || !mail || !employee_id || !date_of_birth || !gender,
      !marital_status ||
        !designation ||
        !department ||
        !salary ||
        !password ||
        !role)
    ) {
      return res.status(400).json({ message: "All field must be filled" });
    }

    const isAuser = await User.findOne({ mail: mail });
    if (isAuser) {
      return res.status(403).json({ message: "User already registered" });
    } 
    else{
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name: emp_name,
        mail,
        password: hashedPassword,
        role,
        profileImage: req.file ? req.file.filename : "",
      });

      const savedUser = await newUser.save();

      const newEmpployee = new Employee({
        userId: newUser._id,
        employeeId: employee_id,
        dob: date_of_birth,
        gender: gender,
        maritalStatus: marital_status,
        designation,
        department,
        salary,
      });
      const savedEmployee = await newEmpployee.save();
      if (savedUser && savedEmployee) {
        return res.status(201).json({ message: "Successful" });
      } else {
        res.status(403).json({ message: "failed" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getEmployees = async (req, res) => {
  try {
    const getEmployee = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");
    if (getEmployee) {
      return res.status(200).json(getEmployee);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ Message: "Internal server error" });
  }
};
const getEmployeeById = async (req, res) => {
  try {
    const specifiedEmployee = await Employee.findById({ _id: req.params.id })
      .populate("userId", { password: 0 })
      .populate("department");
    if (specifiedEmployee) {
      return res.status(200).json(specifiedEmployee);
    } else {
      res.status(401).json({ message: "Empployee not found" });
    }
  } catch (err) {
    console.log(err);
  }
};
const updateEmployee = async (req, res) => {
  const { name, maritalStatus, designation, department, salary } = req.body;
  try {
    const employee = await Employee.findById({ _id: req.params.id });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const user = await User.findById({ _id: employee.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updateRecord = await User.findByIdAndUpdate(employee.userId, {
      name: name,
    });
    const updateEmp = await Employee.findByIdAndUpdate(req.params.id, {
      maritalStatus,
      designation,
      salary,
      department,
    });
    if (!updateRecord && !updateEmp) {
      return res.status.json({ message: "Update failed" });
    }
    res.status(200).json({ message: "Employee updated successully" });
  } catch (err) {
    console.log(err);
  }
};

const fetchEmployeeByDepId = async (req, res) => {
  try {
    const employees = await Employee.find({ department: req.params.id });
    if (!employees) {
      return res.status(400).json({ message: "Not found" });
    }
    return res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
    console.log(err);
  }
};

const fetchProfileByuserId = async (req, res) => {
  try {
    const profile = await Employee.findOne({ userId: req.params.id })
      .populate("userId", { password: 0 })
      .populate("department");
    if (profile) {
      return res.status(200).json(profile);
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export {
  addEmployee,
  upload,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  fetchEmployeeByDepId,
  fetchProfileByuserId,
};
