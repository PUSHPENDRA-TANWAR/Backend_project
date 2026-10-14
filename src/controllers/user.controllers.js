import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User, user} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req , res) =>{
   // steps 

   // get user detail from frontend
   // validation-not empty
   // check if user already exists : check by username and email
   // check for images , check for avatar
   // upload them to cloudinary,avatar
   // create user object-create entry in db
   // remove password and refresh token field from response
   //check for user creation
   // return res

   const {fullName,email,username,password}= req.body
   console.log("email:",email);


   if (
    [fullName,email,username,password].some((field) => field?.trim() ==="")
   ) {
      throw new ApiError(400,"all field are required")
   }

  const existedUser = user.findOne({
    $or:[{username},{email}]
   })
   
    

   if(existedUser){
    throw new ApiError(409, "user with email or username already exist")
   }
   


  const  avatarLocalpath = req.files?.avatar[0]?.path
  const coverImageLocalPath = req.files?.avatar[0]?.path
  
  if(!avatarLocalpath){
    throw new ApiError(400, "Avatar file is required")
  }
   
  const avatar = await uploadOnCloudinary(avatarLocalpath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)  
  
  if(!avatar){
    throw new ApiError(400, "Avatar file is required")
  }
  
   // ye user bana raaha h 
  const user = await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage.url || "",
    email,
    password,
    username:username.toLowerCase()
  })
  
  // ye check karega sach me user bana h 
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" // removing password and refresh token field from response
  )

  if(!createdUser){
    throw new ApiError(500,"something went wrong while registering the user")
  }

  return res.status(201).json(
    new ApiResponse(200,createdUser,"user registered successfully")
  )

})

export{registerUser} 