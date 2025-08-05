import { resumeHandlerAgent } from "@/agents/ResumeExtracter";
import { connect } from "@/utils/config";
import { NextRequest, NextResponse } from "next/server";


connect();


export async function POST(request:NextRequest){
    try {
        const{resume_data} = await request.json();
        if(!resume_data){
            return NextResponse.json(
                {error:"Empty or invalid data"},
                {status:404}
            )
        }
        // calling the agent
        // const agent1 = resumeHandlerAgent(request);
        // const result = await agent1.run("Perform the operation method to you!!");

        // console.log("Agent Result "+result);
        // agentresult:result

        console.log("Came till agent..")
        return NextResponse.json(
            {success:true,message:"everything went fruitfull",},
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