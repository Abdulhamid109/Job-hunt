// An AI agent that can fill out the data from the extracted resume to the database at the particular point

import User from "@/models/userModal";
import { createAgent, createTool, gemini } from "@inngest/agent-kit";
import { z } from "zod";



const addingdata = ()=>{

}

export const resumeHandlerAgent = createAgent({
    name: "Resume Adminstrator",
    description: "An AI agent that can fill out the data from the extracted resume to the database at the particular point",
    system: "",
    model: gemini({
        model: "gemini-1.5-flash",
        apiKey: "",
    }),
    tools: [
        createTool({
            name: "PortFolio Filler",
            description: "The resume text based on the title should fill in the database",
            parameters: z.object({
                portfolioLinks: z.object({
                    linkedIn: z.string().url().optional(),
                    github: z.string().url().optional(),
                    personalWebsite: z.string().url().optional(),
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
            handler: async ({ portfolioLinks, education, technicalSkills,softSkills,languages,certifications }, { network }) => {
                network.state.data.user_portfolio = portfolioLinks;
                network.state.data.education_details = education;
                network.state.data.tech_skills = technicalSkills;
                network.state.data.soft_skills = softSkills;
                network.state.data.languages = languages;
                network.state.data.certification = certifications;
                // here we start storing the data in the database
                const user = await User.create({
                    PortfolioLinks:{
                        linkedIn:portfolioLinks.linkedIn!,
                        github:portfolioLinks.github!,
                        personalWebsite:portfolioLinks.personalWebsite
                    },
                    education:{
                        degree:education.degree
                    }
                })
            },
        })
    ]

})