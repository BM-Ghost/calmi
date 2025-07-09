import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(request: NextRequest) {
  try {
    const { prompt, conversationHistory } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    console.log("Generating response with Groq AI SDK...")

    const { text } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt: prompt,
      temperature: 0.7,
      maxTokens: 1000,
    })

    console.log("Groq AI SDK response generated successfully")

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Groq AI SDK error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate response",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
