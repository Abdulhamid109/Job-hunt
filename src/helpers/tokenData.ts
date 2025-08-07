import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
import { connect } from "@/utils/config";

interface decodedData{
    id:string,
}


export async function getDatafromToken(request:NextRequest) {
    try {
        const token = request.cookies.get("userToken")?.value||"";
        const data = jwt.verify(token,process.env.SECRET_KEY!)as decodedData;
        console.log(data.id);
        return data.id;
    } catch (error:unknown) {
        console.log(error);
        
    }
}