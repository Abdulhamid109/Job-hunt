import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

interface decodedData{
    id:string,
}

export async function getDatafromToken(request:NextRequest) {
    try {
        
    } catch (error:unknown) {
        console.log(error);
        
    }
}