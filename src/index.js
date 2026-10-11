
import connectDB from "./db/index.js";

import dotenv from "dotenv";

dotenv.config({
    path:'./.env'
})


connectDB() // connectDB ko import kara liyaa






// index file me hi db connection ka sara code ese likha jata h 
/*
import express from "express"
const app = express()

(async() =>{
    try {
       await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("error",(error) =>{
        console.log("ERR :",error);
        throw error
        
       })

       app.listen(process.env.PORT,() =>{
        console.log(`App is listening on Port ${process.env.PORT}`);
        
       })
    } catch (error) {
        console.error("ERROR",error)
        throw err
    }
})() */