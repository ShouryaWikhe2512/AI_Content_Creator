// import { NextResponse } from "next/server";
// import { Client } from "@gradio/client";

// export async function POST(req: Request) {
//   "use server";

//   try {
//     const { topic } = await req.json();
//     console.log("Received Meme Topic:", topic);

//     // Connect to the Hugging Face Space
//     const client = await Client.connect("Xhaheen/Meme__Factory");

//     // Call the /predict endpoint with the user-provided topic
//     const result = await client.predict("/predict", { domain: topic });

//     console.log("API Raw Response:", result);

//     if (!result || !Array.isArray(result.data) || result.data.length < 3) {
//       throw new Error("Invalid response format");
//     }

//     const [topText, memeUrl, bottomText] = result.data as [string, string, string];
//     console.log("Generated Meme:", { topText, memeUrl, bottomText });

//     return NextResponse.json({ topText, memeUrl, bottomText });
//   } catch (error) {
//     console.error("Error generating meme:", error);
//     return NextResponse.json({ error: "Failed to generate meme" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { Client } from "@gradio/client";

export async function POST(req: Request) {
  "use server";

  try {
    const { topic } = await req.json();
    console.log("Received Meme Topic:", topic);

    // Connect to the Hugging Face Space
    const client = await Client.connect("Xhaheen/Meme__Factory");

    // Call the /predict endpoint with the user-provided topic
    const result = await client.predict("/predict", { domain: topic });

    console.log("API Raw Response:", result);

    // Validate response structure
    if (!result || !result.data || !Array.isArray(result.data) || result.data.length < 3) {
      throw new Error("Invalid response format");
    }

    const [topText, memeData, bottomText] = result.data;

    // Extract the actual URL from the memeData object
    const memeUrl = memeData?.url;
    console.log("Extracted Meme URL:", memeUrl);

    if (!memeUrl || typeof memeUrl !== "string") {
      throw new Error("Invalid meme image URL received.");
    }

    return NextResponse.json({ topText, memeUrl, bottomText });
  } catch (error) {
    console.error("Error generating meme:", error);
    return NextResponse.json({ error: "Failed to generate meme" }, { status: 500 });
  }
}
