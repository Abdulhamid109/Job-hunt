import mongoose from "mongoose";


const userMd = new mongoose.Schema({
    name:{
        type:String,
        required:[true]
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
    },
    ResumeLink:{
        type:String
    }
});

const User = mongoose.models.user || mongoose.model("user",userMd);
export default User;