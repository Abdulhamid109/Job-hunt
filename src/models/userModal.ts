import mongoose from "mongoose";


const userMd = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter the name"]
    },
    email:{
        type:String,
        required:[true,"Please enter the email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter your Password"]
    },
    
});