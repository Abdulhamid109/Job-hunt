// database connection here

import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function connect(){
    try {
       await mongoose.connect(process.env.MONGOdb_LOCAL_URL!);
       const connection = mongoose.connection;
       connection.on("connection",()=>{
        console.log("Successfully connected to DB")
       })
       connection.on("error",()=>{
            console.log("Failed to connect to DB");
            process.exit(1);
             
       });
       return NextResponse.json(
        {success:true,message:"DB Connection on!!"},
        {status:200}
       )
    } catch (error) {
        return NextResponse.json(
            {error:"Failed to connect the database "+error},
            {status:500}
        )
    }
}