// An AI agent that can fill out the data from the extracted resume to the database at the particular point
// import { getDatafromToken } from "@/helpers/tokenData";
import { inngest } from "@/lib/Inngest";
import { redis } from "@/lib/redis";
import User from "@/models/userModal";
import { createAgent, createTool, gemini } from "@inngest/agent-kit";
import { z } from "zod";


// trigger from frontend..When the User is told to continue with resume data..
export const resumeHandlerAgent = createAgent({
        name: "Resume Adminstrator",
        description: "An AI agent that can fill out the data from the extracted resume to the database at the particular point",
        system: `You are Resume Administrator, an intelligent AI assistant designed to process and structure information from a user's resume. 
                Your primary objective is to accurately extract and organize resume data and populate the relevant fields in a database.
                You must:
                - Interpret raw resume text into structured data.
                - Use contextual understanding to map resume content into specific fields such as:
                - Portfolio Links (LinkedIn, GitHub, Personal Website)
                - Education (Degree, Institution, Start/End Year, Grades)
                - Technical Skills (e.g., programming languages, tools)
                - Soft Skills (e.g., leadership, communication)
                - Languages (spoken/written)
                - Certifications (with issuing organization and date)

                Do not fabricate or infer any data not explicitly mentioned or reasonably implied in the resume text.

                Ensure the formatting of each field is correct and aligns with expected types:
                - URLs are optional if not present then null
                - Dates must be valid and parsable or they can be strings
                - Arrays should only include non-empty, relevant strings

                Only call the appropriate tool \`PortFolioFiller\` once all fields are well-extracted and logically mapped.

                Your ultimate goal is to assist the user in smoothly transferring all meaningful resume data into their profile database with high accuracy and minimal assumptions.`,
        model: gemini({
            model: "gemini-1.5-flash",
            apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
        }),
        tools: [
            createTool({
                name: "PortFolioFiller",
                description: "The resume text based on the title should fill in the database",
                parameters: z.object({
                    portfolioLinks: z.object({
                        linkedIn: z.string().optional(),
                        github: z.string().optional(),
                        personalWebsite: z.string().optional(),
                    }),
                    education: z.object({
                        degree: z.string(),
                        institution: z.string(),
                        startYear: z.number(),
                        endYear: z.number(),
                        gradeOrPercentage: z.string(),
                    }),
                    technicalSkills: z.array(z.string().min(1)).optional(),
                    softSkills: z.array(z.string().min(1)).optional(),
                    languages: z.array(z.string().min(1)).optional(),

                    certifications: z.array(
                        z.object({
                            name: z.string().min(1),
                            issuingOrganization: z.string().min(1),
                            dateEarned: z.coerce.date(), // converts from string or Date
                        })
                    ).optional(),
                }),
                handler: async ({ portfolioLinks, education, technicalSkills, softSkills, languages, certifications }, { network }) => {

                    network.state.data.user_portfolio = portfolioLinks;
                    network.state.data.education_details = education;
                    network.state.data.tech_skills = technicalSkills;
                    network.state.data.soft_skills = softSkills;
                    network.state.data.languages = languages;
                    network.state.data.certification = certifications;

                    console.log("PortFolio Link "+portfolioLinks.github);
                    console.log("PortFolio Link "+portfolioLinks.linkedIn);
                    console.log("PortFolio Link "+portfolioLinks.personalWebsite);
                    const userId = await redis.get("cuid");

                    console.log("Current Users UID"+userId);

                    //create the background worker where they can update the values in the db

                    await inngest.send({
                        name:"hunt/resumeDataToDB",
                        data:{
                            github:portfolioLinks.github,
                            linkedIn:portfolioLinks.linkedIn,
                            personalWebsite:portfolioLinks.personalWebsite,
                            degree:education.degree,
                            institution:education.institution,
                            startYear:education.startYear,
                            endYear:education.endYear,
                            gradeOrPercentage:education.gradeOrPercentage,
                            technicalSkills:technicalSkills,
                            softSkills,
                            languages,
                            certifications,
                            // name:certifications
                            userId
                        }
                    })

                    // education
                    console.log("Educationnn "+education.degree)
                    // here we start storing the data in the database
                    // const userId = await getDatafromToken(request)
                    // await User.findByIdAndUpdate(
                    //     userId,
                    //     {
                    //         PortfolioLinks: {
                    //             linkedIn: portfolioLinks.linkedIn,
                    //             github: portfolioLinks.github,
                    //             personalWebsite: portfolioLinks.personalWebsite,
                    //         },
                    //         education: {
                    //             degree: education.degree,
                    //             institution: education.institution,
                    //             startYear: education.startYear,
                    //             endYear: education.endYear,
                    //             gradeOrPercentage: education.gradeOrPercentage,
                    //         },
                    //         technicalSkills,
                    //         softSkills,
                    //         languages,
                    //         certifications,
                    //     },
                    //     { new: true, upsert: false } // upsert false ensures it only updates if found
                    // );

                    return { success: true };

                },
            })
        ]

    })