import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

interface decodedData{
    id:string,
}

export async function getDatafromToken(request:NextRequest) {
    try {
        const token = request.cookies.get("userToken")?.value||"";
        const data = jwt.verify(token,"Sectry_key")as decodedData;
        return data.id;
    } catch (error:unknown) {
        console.log(error);
        
    }
}