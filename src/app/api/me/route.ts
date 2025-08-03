import { connect } from "@/utils/config";
import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import User from "@/models/userModal";
import { getDatafromToken } from "@/helpers/tokenData";

connect();




// methof creating the data

export async function POST(request: NextRequest) {
    try {

        const userid = await getDatafromToken(request);
        const formdata = await request.formData();
        //Needs to send to imagekit
        const YOE: string = formdata.get("YOE") as string;
        const phoneNumber: string = formdata.get("pn") as string;
        const currentAddress: string = formdata.get("address") as string;
        const companyName: string = formdata.get("CN") as string;
        const jobTitle: string = formdata.get("JT") as string;
        const startDate = formdata.get("SD");
        const endDate = formdata.get("ED");
        const responsibilities: string = formdata.get("responsibilities") as string;
        const reasonForLeaving: string | null = formdata.get("reasonForLeaving") as string | null
        const criminalRecord = formdata.get("criminalRecord");
        const nonCompeteAcknowledged = formdata.get("nonCompeteAcknowledged");
        const workAuthorizationStatus = formdata.get("workAuthorizationStatus");

        
        // i should call the agent here
        await User.findOneAndUpdate({_id:userid},
            {
                $set:{
                    phoneNumber,
                    currentAddress,
                    criminalRecord,
                    nonCompeteAcknowledged,
                    workAuthorizationStatus
                },
                
            },
            {new:true}
        );
        if (parseInt(YOE) !== 0) {
            await User.findOneAndUpdate(
                { _id: userid },
                {
                    $push: {
                        workExperience: {
                            companyName,
                            jobTitle,
                            startDate,
                            endDate,
                            responsibilities,
                            reasonForLeaving,
                        },
                    },
                },
                { new: true }
            );
        }
    


    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server error " + error },
            { status: 500 }
        )
    }
}