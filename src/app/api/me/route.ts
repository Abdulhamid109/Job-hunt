import { connect } from "@/utils/config";
import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import User from "@/models/userModal";

connect();

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
})
export async function POST(request:NextRequest) {
    try {
        const formdata = await request.formData();
        const file = formdata.get("file") as File; //Needs to send to imagekit
        const filename:string = formdata.get("filename") as string; //Needs to send to imagekit
        const YOE:string = formdata.get("YOE") as string;
        const phoneNumber:string = formdata.get("pn") as string;
        const currentAddress:string = formdata.get("address") as string;
        const companyName:string = formdata.get("CN") as string;
        const jobTitle:string = formdata.get("JT") as string;
        const startDate = formdata.get("SD") ;
        const endDate = formdata.get("ED");
        const responsibilities:string = formdata.get("responsibilities") as string;
        const reasonForLeaving:string|null = formdata.get("reasonForLeaving") as string|null
        const criminalRecord = formdata.get("criminalRecord");
        const nonCompeteAcknowledged = formdata.get("nonCompeteAcknowledged");
        const workAuthorizationStatus = formdata.get("workAuthorizationStatus");

        if(!file){
            return NextResponse.json(
                {error:"File not found!!"},
                {status:404}
            )
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const response = await imagekit.upload({
            file:buffer,
            fileName:filename,
            folder:"/resumes"
        });

        const profileData = new User({
            phoneNumber,
            currentAddress,

        })
        if(parseInt(YOE)!==0){
            //here no work will be added to db
            await User.findOneAndUpdate()

        }
        //work willbe added to db


    } catch (error) {
        return NextResponse.json(
            {error:"Internal Server error "+error},
            {status:500}
        )
    }
}