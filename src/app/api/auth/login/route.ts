import { connect } from "@/utils/config";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(request:NextRequest){
    try {
        const {email,password} = await request.json();
        // need to check if that particular exists or not
        
    } catch (error) {
        return NextResponse.json(
            {error:"Internal Server Error"+error},
            {status:500}
        )
    }
}