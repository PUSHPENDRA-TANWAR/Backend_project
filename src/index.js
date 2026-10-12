
import connectDB from "./db/index.js";

import dotenv from "dotenv";

dotenv.config({
    path:'./.env'
})



/* Ye ek Node.js/Express app ka server start karne wala code hai,
 jo pehle MongoDB database se connect hota hai,
  aur uske baad hi server chalu karta hai.*/
  
connectDB() // connectDB ko import kara liyaa
.then(() => {
    app.listen(process.env.PORT || 8000 , () => {
        console.log(`server is running at port : ${process.env.PORT}`);
        
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!!" , err);
    
})





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