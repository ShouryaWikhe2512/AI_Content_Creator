import { NextResponse } from "next/server";
import { Client } from "@gradio/client";

export async function POST(req: Request) {
  "use server"; // Required for App Router API routes

  try {
    const { prompt } = await req.json();
    console.log("Received Prompt:", prompt);

    const client = await Client.connect("artificialguybr/Studio-Ghibli-LORA-SDXL");
    const result = await client.predict("/predict", { prompt });

    console.log("API Raw Response:", result);

    // Extract the image URL properly
    if (!result || !result.data || !Array.isArray(result.data) || !result.data[0].url) {
      throw new Error("Invalid response format");
    }

    const imageUrl = result.data[0].url;
    console.log("Extracted Image URL:", imageUrl);

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Error generating Ghibli-style image:", error);
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
  }
}
