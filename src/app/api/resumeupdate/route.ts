// here we will be uploading/updating the resume to our db
import User from "@/models/userModal";
import { connect } from "@/utils/config";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(request:NextRequest){
    try {
        const {resumeUrl,uid} = await request.json();
        const updatedUser = await User.findOneAndUpdate({_id:uid},{resumeLink:resumeUrl})
        if(!updatedUser){
            return NextResponse.json(
                {error:"Failed to Update the resumeLink"},
                {status:404}
            )
        }
        return NextResponse.json(
            {success:true,message:"Successfully updated the resume link in the schema"},
            {status:200}
        )
    } catch (error) {
        return NextResponse.json(
            {error:"Internal Server error"+error},
            {status:500}
        )
    }
}

