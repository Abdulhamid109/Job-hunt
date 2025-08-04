import axios from "axios";

export async function ExtarctTextFromResume(resumeUrl:string) {
    try {
        //make an axios call to the fastapi backend!!
        const response = await axios.post("http://127.0.0.1:8000/extractresume",{resume_link:resumeUrl});
        if(response.status!==200){
            console.log("Something went wrong!!,Failed to extract the resume");
        }
        return response.data.resume_text;
    } catch (error) {
        return "Somthin went wrong!!";
    }
}