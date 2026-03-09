import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const prompts = {
  short: "Summarize the following text in 1-2 sentences. Be very concise.",
  normal: "Summarize the following text concisely in 2-4 sentences.",
};

// Scale bullet groups and points based on word count
function getBulletsPrompt(wordCount: number): string {
  let groups: string;
  let bullets: string;

  if (wordCount < 80) {
    groups = "1";
    bullets = "2-3";
  } else if (wordCount < 200) {
    groups = "2";
    bullets = "2-3";
  } else if (wordCount < 1000) {
    groups = "3-4";
    bullets = "3-4";
  } else {
    groups = "5-7";
    bullets = "4-5";
  }

  return `Summarize the following text as grouped bullet points. Identify ${groups} key topic(s) and create a group for each. Format: '## Group Title' on its own line, then '• point' lines (${bullets} bullets per group, 1 sentence each). No intro text, just the groups.`;
}

export async function POST(req: NextRequest) {
  const { text, type = "normal" } = await req.json();

  if (!text?.trim()) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  const wordCount = text.trim().split(/\s+/).length;
  const systemPrompt =
    type === "bullets"
      ? getBulletsPrompt(wordCount)
      : (prompts[type as keyof typeof prompts] ?? prompts.normal);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: text },
    ],
  });

  const summary = completion.choices[0].message.content ?? "";
  return NextResponse.json({ summary });
}
