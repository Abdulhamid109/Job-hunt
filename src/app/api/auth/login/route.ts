import User from "@/models/userModal";
import { connect } from "@/utils/config";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        // need to check if that particular exists or not
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "Account does not Exists" },
                { status: 404 }
            )
        }
        // compare the password
        else {
            const result = await bcrypt.compare(password, user.password);
            if (!result) {
                return NextResponse.json(
                    { error: "Wrong Credentials" },
                    { status: 400 }
                )
            }
            // setting the cookies
            const payload = {
                id:user.id,
                email:email
            }

            const token = jwt.sign(payload,process.env.SECRECT_KEY!,{
                expiresIn:"1d"
            });

            const response = NextResponse.json(
                {success:true},
                {status:200}
            );

            response.cookies.set("userToken",token);
            return response
            
        }

    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" + error },
            { status: 500 }
        )
    }
}