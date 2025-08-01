import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "software engineer";
    const location = searchParams.get("location") || "navi mumbai";

    const apikey = process.env.SERPAPI_KEY;
    if (!apikey) {
      return NextResponse.json(
        { error: "Missing SerpApi API key in environment variables." },
        { status: 500 }
      );
    }

    const serpApiUrl = `https://serpapi.com/search?engine=google_jobs&q=${query}&location=${location}&api_key=${apikey}&hl=en&gl=in`;

    const response = await fetch(serpApiUrl);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from SerpApi", status: response.status },
        { status: response.status }
      );
    }

    const data = await response.json();
     console.log("is this data --> "+data.jobs_results)
    //  console.log("is this data --> "+data.apply_options.link)
    return NextResponse.json(
        {success:true,alldata:data}, {status: 200,});
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: String(error) },
      { status: 500 }
    );
  }
}
