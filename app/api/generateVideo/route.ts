
// route.ts
import { NextResponse } from "next/server";
import { Client } from "@gradio/client";

export async function POST(req: Request) {
  "use server";

  try {
    const { prompt } = await req.json();
    console.log("Received Prompt:", prompt);

    const imageURL = "https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png";
    const imageResponse = await fetch(imageURL);
    const imageBlob = await imageResponse.blob();

    const client = await Client.connect("Pyramid-Flow/pyramid-flow");
    const result = await client.predict("/generate_video", {
      prompt,
      image: imageBlob,
      duration: 3,
      guidance_scale: 9,
      video_guidance_scale: 5,
      frames_per_second: 8,
    });

    console.log("API Raw Response:", result);

    if (!result || !result.data) {
      throw new Error("Invalid response format");
    }

    const videoUrl = result.data;
    console.log("Extracted Video URL:", videoUrl);

    return NextResponse.json({ videoUrl });
  } catch (error) {
    console.error("Error generating video:", error);
    return NextResponse.json({ error: "Failed to generate video" }, { status: 500 });
  }
}
