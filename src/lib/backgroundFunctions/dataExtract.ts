// extarcting data from the resume from python on event fired from the resumehandler route
import { ExtarctTextFromResume } from "@/helpers/extractText";
import { inngest } from "@/lib/Inngest";
import axios from "axios";


export const extarctResumeText = inngest.createFunction(
    { id: "getResumeText", retries: 2 },
    { event: "hunt/resumesURLSender" },
    async ({ event, step }) => {
        const { resumeUrl } = event.data;
        await step.run("extract-text", async () => {
            // a python helper function for extracting the text from it
            const resume_data = await ExtarctTextFromResume(resumeUrl);
            // runn the agent here...--Not Possible
            // there are 2 possible solutions for it
            // 1. We can call a post method and send the extracted resume data to it and then from there we can call the agent
            // 2. Or we can store the data for small span of time on redis and then on another createFunction we can directly send it to agent
            const response = await axios.post("http://localhost:3000/api/extractedResume",{resume_data});
            if(response.status!==200){
                console.log("Error - ",response.data.error)
            }
            return response.data.success;
        })
    }
)