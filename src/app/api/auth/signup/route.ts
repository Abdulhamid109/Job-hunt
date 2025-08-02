import User from "@/models/userModal";
import { connect } from "@/utils/config";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";


connect();

export async function POST(request:NextResponse){
    try {
        const {name,email,password} = await request.json();
        const user = await User.findOne({ email });

        if(user){
            return NextResponse.json(
                { error: "Account Already Exists" },
                { status: 404 }
            )
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            name,
            email,
            password:hashedPassword
        });

        const savedUser = await newUser.save();

        return NextResponse.json(
            {success:true,message:"Account successfully created!!",savedUser},
            {status:200}
        )
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" + error },
            { status: 500 }
        )
    }
}