import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"// mere server se user k browser 
// ki cookies access kar pau or use kar pau

const app = express()

// ye use method h ye sare middleware or config. k liye use me aata h 
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit : "16kb"})) // here we set limit json file 
app.use(express.urlencoded({extended: true,limit:"16kb"}))// ye url data k liye h
app.use(express.static("public")) // We use express.static() middleware to serve 
// static assets such as HTML, CSS, JavaScript, and image files 
// to clients without creating separate routes for each file.
app.use(cookieParser())

// rotes import 

import userRouter from './routes/user.routes.js'

// routes declaration

app.use("/api/v1/users",userRouter) // ye /user control pass kar raha h user.routes pr 
// ye hamne middleware likha h 


export {app}