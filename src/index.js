// require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'
dotenv.config({ path: './env' })

import connectDB from "./db/index.js";
import { app } from './app.js';

const port = process.env.PORT || 5000
 
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`⚙️ Server is running at port : ${port}`);
        })
        app.on("error", (error) => {
            console.log("ERROR (in index file for app)", error);
            throw error;  
        })
    })
    .catch((error) => {
        console.error("MONGODB connection failed (in index file) !!!:", error)
    })

