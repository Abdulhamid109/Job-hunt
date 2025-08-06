import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

interface decodedData{
    id:string,
}

export async function getDatafromToken(request:NextRequest) {
    try {
        const token = request.cookies.get("token")?.value||"";
        const data = jwt.verify(token,process.env.SECRET_KEY!)as decodedData;
        return data.id;
    } catch (error:unknown) {
        console.log(error);
        
    }
}