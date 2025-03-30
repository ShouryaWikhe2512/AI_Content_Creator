// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   "use server";

//   try {
//     // Parse request body
//     const body = await req.json().catch(() => null);

//     if (!body || typeof body !== "object") {
//       return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
//     }

//     const { video_title, video_description, style } = body;

//     if (!video_title || !style) {
//       return NextResponse.json({ error: "Missing required fields: video_title and style" }, { status: 400 });
//     }

//     console.log("Received Request:", { video_title, video_description, style });

//     // Send request to backend API
//     const response = await fetch("http://localhost:8000/creative/thumbnail", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify({ video_title, video_description, style }),
//     });

//     if (!response.ok) {
//       throw new Error(`API request failed with status ${response.status}`);
//     }

//     const data = await response.json();

//     console.log("API Response:", data);

//     return NextResponse.json(data);
//   } catch (error: unknown) {
//     let errorMessage = "Failed to generate thumbnail";

//     if (error instanceof Error) {
//       errorMessage = error.message;
//     } else if (typeof error === "string") {
//       errorMessage = error;
//     }

//     console.error("Error generating thumbnail:", errorMessage);
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }
