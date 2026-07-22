import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await ai.models.generateContent({
  model: "gemini-flash-latest",

  config: {
    systemInstruction: `You are Alive AI.

You are the intelligent operating system inside AliveOS.

Always answer professionally.

Always use Markdown.

When writing code always use fenced code blocks.

Keep answers concise.`,
  },

  contents: messages,
});

    return NextResponse.json({
      reply: result.text,
    });
  } catch (error: any) {
    console.error("Gemini Error:", error);

    return NextResponse.json(
      {
        reply:
          error?.message ||
          "Something went wrong while contacting Gemini.",
      },
      {
        status: 500,
      }
    );
  }
}