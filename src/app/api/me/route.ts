import { connect } from "@/utils/config";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(request:NextRequest) {
    try {
        
    } catch (error) {
        return NextResponse.json(
            {error:"Internal Server error "+error},
            {status:500}
        )
    }
}