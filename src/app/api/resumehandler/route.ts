import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import { connect } from "@/utils/config";


connect();


const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
})
export async function POST(request: NextRequest) {
    try {
        const formdata = await request.formData();
        const file = formdata.get("file") as File;
        const filename: string = formdata.get("filename") as string;
        if (!file) {
            return NextResponse.json(
                { error: "File not found!!" },
                { status: 404 }
            )
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const response = await imagekit.upload({
            file: buffer,
            fileName: filename,
            folder: "/resumes"
        });
        
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server error " + error },
            { status: 500 }
        )
    }
}