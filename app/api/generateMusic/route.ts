import { NextResponse } from "next/server";
import { Client } from "@gradio/client";

export async function POST(req: Request) {
  "use server"; // Required for App Router API routes

  try {
    const { prompt } = await req.json();
    console.log("Received Prompt:", prompt);

    // Connect to the AI Music Generation API
    const client = await Client.connect("https://reach-vb-musicgen-prompt-upsampling.hf.space/--replicas/4yaka/");
    const result = await client.predict("/generate_audio", [prompt]);

    console.log("API Raw Response:", result);

    // Ensure result.data is an array
    if (!result || !result.data || !Array.isArray(result.data) || result.data.length < 2) {
      throw new Error("Invalid response format from API");
    }

    const audioUrl: string = result.data[0] as string; // AI-generated music
    const upsampledPrompt: string = result.data[1] as string; // Enhanced prompt output

    console.log("Extracted Audio URL:", audioUrl);
    console.log("Upsampled Prompt:", upsampledPrompt);

    return NextResponse.json({ audioUrl, upsampledPrompt });
  } catch (error) {
    console.error("Error generating music:", error);
    return NextResponse.json({ error: "Failed to generate music" }, { status: 500 });
  }
}
