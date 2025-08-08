// Saving the resume_link in the database
import { inngest } from "@/lib/Inngest";
import User from "@/models/userModal";
import axios from "axios";



export const resume_db_adder = inngest.createFunction(
    { id: "resume_link-db-adder", retries: 2 },
    { event: "hunt/resumelinkDbadder" },
    async ({ event, step }) => {
        const { resumeUrl, uid } = event.data;

        await step.run("resume_link-db", async () => {
            // we have to update the database with the resume_link
            const response = await axios.post("http://localhost:3000/api/resumeupdate", { resumeUrl, uid });
            if (response.status !== 200) {
                console.log("Failed to update the resume");
            }
            console.log("everything went fruitfull...");
        })
    }
)


export const resume_rem_db_adder = inngest.createFunction(
    { id: "resume_rem_db_adder", retries: 2 },
    { event: "hunt/resumeDataToDB" },
    async ({ event, step }) => {
        const { github, linkedIn, personalWebsite, degree, institution,
            startYear, endYear, gradeOrPercentage, technicalSkills,
            softSkills, languages, certifications, userId
        } = event.data;


        console.log("Data Comming From the Agent...")

        console.log({
            github,
            linkedIn,
            personalWebsite,
            degree,
            institution,
            startYear,
            endYear,
            gradeOrPercentage,
            technicalSkills,
            softSkills,
            languages,
            // certifications,
            userId
        });
        
        //we can do the db operation here only
        const updatedUser = await User.findOneAndUpdate(
            {_id:userId},{
            PortfolioLinks:{
                linkedIn,
                github,
                personalWebsite
            },
            education:{
                degree,
                institution,
                startYear,
                endYear,
                gradeOrPercentage
            },
            technicalSkills,
            softSkills,
            languages
            // certifications:{
            //     name:certifications.name || "",
            //     issuingOrganization:certifications.issuingOrganization || "",
            //     dateEarned:certifications.dateEarned || ""
            // }
        });


        return {success:true,updatedUser};
    }
)