"use client";

import axios from "axios";
import { useState } from "react";
import puppeteer from "puppeteer";

interface JobRequestData {
  job_location: string;
  job_title: string;
}

interface JobResult {
  job_id: string;
  title: string;
  company_name: string;
  location: string;
  description: string;
  apply_options: { 
    title:string;
    link: string }[];
}

export default function Home() {
  const [data, setData] = useState<JobRequestData>({
    job_location: "",
    job_title: "",
  });

  const [jobs, setJobs] = useState<JobResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [joblink,setjoblink] = useState("");

  // const fetchJobs = async () => {
  //   setLoading(true);
  //   setError("");
  //   try {
  //     const res = await axios.get(
  //       `/api/getdata?q=${encodeURIComponent(data.job_title)}&location=${encodeURIComponent(data.job_location)}`
  //     );

  //     const jobResults = res.data.alldata.jobs_results || [];
  //     setJobs(jobResults);
  //     checkLoggedInStatus();
  //   } catch (err: any) {
  //     console.error(err);
  //     setError("Failed to fetch jobs. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // automatiing the auth part

  // checkinng the status whther the particular user is logged in or not

  const checkLoggedInStatus=async()=>{
    try {
      const browser = await puppeteer.launch({
        headless:false,
      });
      const page = await browser.newPage();
      await page.goto(joblink);
      // await page.waitForSelector()
    } catch (error) {
      console.log("Error "+error);
    }
  }

  return (
    
    <div>Homepage</div>
  );
}
