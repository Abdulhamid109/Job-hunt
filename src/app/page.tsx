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

  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `/api/getdata?q=${encodeURIComponent(data.job_title)}&location=${encodeURIComponent(data.job_location)}`
      );

      const jobResults = res.data.alldata.jobs_results || [];
      setJobs(jobResults);
      checkLoggedInStatus();
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
    <div className="flex flex-col justify-center items-center p-10 text-white min-h-screen bg-zinc-950">
      <section className="bg-zinc-800 rounded-md w-full max-w-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Find Jobs Instantly</h1>

        <div className="flex flex-col gap-4">
          <input
            value={data.job_title}
            onChange={(e) => setData({ ...data, job_title: e.target.value })}
            className="p-3 bg-zinc-900 border border-zinc-700 rounded-md"
            type="text"
            placeholder="Enter the job title (e.g. Software Engineer)"
          />
          <input
            value={data.job_location}
            onChange={(e) => setData({ ...data, job_location: e.target.value })}
            className="p-3 bg-zinc-900 border border-zinc-700 rounded-md"
            type="text"
            placeholder="Enter the location (e.g. Navi Mumbai)"
          />

          <button
            onClick={fetchJobs}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 transition-colors p-3 rounded-md text-white font-semibold"
          >
            {loading ? "Fetching..." : "Fetch Jobs"}
          </button>
        </div>
        {error && <p className="text-red-400 mt-3 text-center">{error}</p>}
      </section>

      <section className="w-full max-w-4xl mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">Relevant Jobs</h2>
        <div className="grid gap-4">
          {jobs.length === 0 && !loading && (
            <p className="text-zinc-400 text-center">No jobs to display yet.</p>
          )}
          {jobs.map((job) => (
            <div
              key={job.job_id}
              className="bg-zinc-800 p-5 rounded-lg border border-zinc-700"
            >
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p className="text-sm text-zinc-400">{job.company_name} — {job.location}</p>
              <p className="text-sm mt-2">{job.description}</p>
              {job.apply_options?.[0].link && (
                <>
                <h4>{job.apply_options[0].title}</h4>
                {setjoblink(job.apply_options[0].link)}
                <a
                  href={job.apply_options[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-blue-400 hover:underline"
                >
                  View Job →
                </a>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
