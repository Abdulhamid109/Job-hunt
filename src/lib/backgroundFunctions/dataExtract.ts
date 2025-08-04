// extarcting data from the resume from python on event fired from the resumehandler route
import { inngest } from "@/lib/Inngest";


export const extarctResumeText = inngest.createFunction(
    {id:"getResumeText",retries:2},
    {event:"hunt/resumesURLSender"},
    async({event,step})=>{

    }
)