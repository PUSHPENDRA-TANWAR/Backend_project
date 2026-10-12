 import mongoose,{Schema} from "mongoose";
 import jwt from "jsonwebtoken"; // jwt is like a key jiske pass bhi 
 // key h  uske pass data bhej diya jayega
 import bcrypt from "bcrypt"       // use for password encryption 

 const userSchema = new Schema(
    {
      username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true // index true se ye username field bahut 
                   // easy way me searchable ho jayegi database me
      },
      email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
        
      },
      fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
      },
      avatar:{
        type:String, // cloudinary url use here
        required:true
        
      },
      coverimage:{
        type:string // cloudinary url use here
      },
      watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref: "video"
        }
      ],
      password:{
        type:string,
        required:[true,'password is required']
      },
      refreshToken:{
        type:string
      }

    },
    {
        timestamp:true
    }
)


// pre-hook ka use kisi operation ke execute hone se
//  pehle code run karne ke liye hota hai. Isko pre middleware bhi kehte hain.
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next(); // password ko firsttime hash 
    // karoge ya update k time has karna h har baar nhi karna isiliye ye if condition lagayi h 
   this.password = bcrypt.hash(this.password, 10)
   next()
})

userSchema.method.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password)
}


userSchema.methods.generateAccessToken = function(){
  return  jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
     return  jwt.sign(
        {
            _id:this._id,
           
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User",userSchema)

