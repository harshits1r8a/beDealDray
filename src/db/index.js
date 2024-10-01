import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async()=>{
    try {
        const connInst = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // console.log(connInst);
        console.log(`\n MongoDB connected !! DB HOST : ${connInst.connection.host}`);
    } catch (error) {
        console.error("MONGODB connection FAILED :", error)
        process.exit(1)
    }
}

export default connectDB
