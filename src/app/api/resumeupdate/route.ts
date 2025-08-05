// here we will be uploading/updating the resume to our db

import { getDatafromToken } from "@/helpers/tokenData";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest){
    try {
        const {resume_link} = await request.json();
        const userid = await getDatafromToken(request);

        const updatedUser = await User.findOneAndUpdate({_id:userid},{resumeLink:resume_link})
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

