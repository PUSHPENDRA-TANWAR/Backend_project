import mongoose,{Schema} from "mongoose";

//mongooseAggregatePaginate ka use MongoDB aggregation ke results ko 
// pages mein divide karne ke liye hota hai.
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new Schema(
    {
        videoFile:{
            type:String, // cloudnary url 
            required: ture

        },
        thumnail:{
             type:String, // cloudnary url 
            required: ture
        },
         title:{
             type:String, 
            required: ture
        },
         description:{
             type:String, 
            required: ture
        },
         duration:{
             type:Number, 
            required: ture
        },
         views:{
             type:Number, 
            default:0
        },
        isPublished:{
            type:Boolean,
            default:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamp:true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video",videoSchema)
