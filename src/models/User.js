import mongoose from "mongoose";


const userSchema= mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    createdAt:Date,
    created_at:String

})



export default mongoose.model("User", userSchema);