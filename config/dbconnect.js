import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
const dbconnect = async()=>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_URL)
        if(connect){
            console.log("STANDARD DB")
        }
        
    }
    catch(err){
        console.log(err)
    }
}

export default dbconnect
 