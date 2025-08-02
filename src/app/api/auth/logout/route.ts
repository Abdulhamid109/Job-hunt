import { NextResponse } from "next/server";


export async function GET() {
    try {
        const response = NextResponse.json(
            {success:"Successfully logged out!!"},
            {status:200}
        );

        response.cookies.set("userToken","");
        return response;

    } catch (error) {
        return NextResponse.json(
                    { error: "Internal Server Error" + error },
                    { status: 500 }
                )
    }
}