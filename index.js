import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import dbconnect from "./config/dbconnect.js"
import router from "./route/autroute.js"
import departmentRouter from "./route/deparment.js"
import employeeRouter from "./route/employees.js"
import salaryRouter from "./route/salary.js"
import leaveRouter from "./route/leave.js"
import settingsRouter from "./route/setting.js"
import { dashboardRouter } from "./route/dashboard.js"
dbconnect()

dotenv.config()
const app = express()
const  coreOptions= {
    origin: ["https://ems-7200.onrender.com", "http://localhost:5173"],
    credentials: true,
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders:[
        'Authorization',
        'Content-Type'
    ]
}
app.use(cors(coreOptions))
app.use(express.json())
app.use(express.static("public/uploads"))
app.use("/api", router)
app.use("/api", departmentRouter)
app.use("/api", employeeRouter)
app.use("/api", salaryRouter)
app.use("/api", leaveRouter)
app.use("/api", settingsRouter)
app.use("/api", dashboardRouter)


const port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log("App is running on port ", port)
})
