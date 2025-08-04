import mongoose from "mongoose";

const UserMd = new mongoose.Schema({
    // 1. Personal Information
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password:{type:String,required:true},
    phoneNumber: { type: String, required: true },
    currentAddress: { type: String },
    PortfolioLinks: {
        linkedIn: { type: String },
        github: { type: String },
        personalWebsite: { type: String },
    },

<<<<<<< HEAD
const userMd = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter the name"]
    },
    email:{
        type:String,
        required:[true,"Please enter the email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter your Password"]
    },
=======
    // 2. Job-Specific Details
    preferredLocations: [{ type: String }],
    expectedSalary: { type: String },
    availability: { type: String },
    willingToRelocate: { type: Boolean, default: false },
    willingToTravel: { type: Boolean, default: false },

    // 3. Resume/CV Upload
    resumeLink: { type: String, required: true },
    coverLetterLink: { type: String },
    YearsOfExperience:{type:String},
    // 4. Work Experience
    workExperience: [
        {
            companyName: { type: String },
            jobTitle: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
            responsibilities: { type: String },
            reasonForLeaving: { type: String },
        },
    ],

    // 5. Education
    education: {
            degree: { type: String },
            institution: { type: String },
            startYear: { type: Number },
            endYear: { type: Number },
            gradeOrPercentage: { type: String },
        },
>>>>>>> 361ce268eb0afcce4050ae3bb56a0f4b3c05c0b4
    

    // 6. Skills
    technicalSkills: [{ type: String }],
    softSkills: [{ type: String }],
    languages: [{ type: String }],

    // 7. Certifications
    certifications: [
        {
            name: { type: String },
            issuingOrganization: { type: String },
            dateEarned: { type: Date },
        },
    ],

    // 8. References
    references: [
        {
            name: { type: String },
            relationship: { type: String },
            contactInfo: { type: String },
        },
    ],

    // 9. Legal Declarations
    workAuthorizationStatus: { type: String },
    criminalRecord: { type: Boolean },
    nonCompeteAcknowledged: { type: Boolean },

    //   // 10. Additional Questions
    //   motivation: { type: String }, // "Why do you want to join us?"
    //   proudProject: { type: String },
    //   howDidYouHearAboutUs: { type: String },

    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.user || mongoose.model("user", UserMd);
export default User;
