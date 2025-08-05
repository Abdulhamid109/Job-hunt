// api/inngest/route.ts
import { serve } from "inngest/next";
import { inngest } from "@/lib/Inngest";

// Import ALL your functions
import {extarctResumeText} from "@/lib/backgroundFunctions/dataExtract";
import {resume_db_adder} from "@/lib/backgroundFunctions/dbSave";


// Create the handler
const handler = serve({
    client: inngest,
    functions: [
        extarctResumeText,           // Listens to "hunt/resumelinkDbadder"
        resume_db_adder, // Listens to "hunt-resumesURLSender" 

    ],
});

// Export all HTTP methods
export const { GET, POST, PUT } = handler;