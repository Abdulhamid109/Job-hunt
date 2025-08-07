// Saving the resume_link in the database
import {inngest} from "@/lib/Inngest";
import axios from "axios";



export const resume_db_adder = inngest.createFunction(
    {id:"resume_link-db-adder",retries:2},
    {event:"hunt/resumelinkDbadder"},
    async({event,step})=>{
        const {resumeUrl,uid} = event.data;

        await step.run("resume_link-db",async()=>{
            // we have to update the database with the resume_link
            const response = await axios.post("http://localhost:3000/api/resumeupdate",{resumeUrl,uid});
            if(response.status!==200){
                console.log("Failed to update the resume");
            }
            console.log("everything went fruitfull...");
        })
    }
)