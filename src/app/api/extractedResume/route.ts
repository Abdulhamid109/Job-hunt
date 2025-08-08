import { resumeHandlerAgent } from "@/agents/ResumeExtracter";
import { getDatafromToken } from "@/helpers/tokenData";
import { redis } from "@/lib/redis";
import { connect } from "@/utils/config";
import { NextRequest, NextResponse } from "next/server";


connect();


export async function POST(request:NextRequest){
    try {
        const{resume_data,uid} = await request.json();
        
        if(!resume_data){
            return NextResponse.json(
                {error:"Empty or invalid data"},
                {status:404}
            )
        }
        
        // calling the agent
        console.log("Agent ki Pass UID ",uid);
        const result = await resumeHandlerAgent.run(`This is my resume text ${resume_data}`);
        console.log("Agent Result "+result);
        console.log("Came till agent..")
        return NextResponse.json(
            {success:true,message:"everything went fruitfull",agentresult:result},
            {status:200}
        )
    } catch (error) {
        console.log("Failed to invoke the Agent MAnipulations"+error);
        return NextResponse.json(
            {error:"Agent Internal Error "+error},
            {status:500}
        )
    }
}