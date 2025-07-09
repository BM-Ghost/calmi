import { type NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are Dr. AI, a compassionate mental health therapist. You provide empathetic, supportive responses while maintaining professional boundaries. Always prioritize user safety and well-being.

Key guidelines:
- Be warm, empathetic, and non-judgmental
- Ask open-ended questions to encourage sharing
- Validate emotions and experiences
- Provide coping strategies when appropriate
- Recognize crisis situations and recommend professional help
- Maintain therapeutic boundaries
- Focus on mental health and emotional wellbeing

If someone expresses suicidal thoughts or severe crisis, immediately express concern and recommend professional help or crisis resources.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama-3.1-70b-versatile",
      temperature: 0.7,
      max_tokens: 1000,
    })

    const response =
      completion.choices[0]?.message?.content || "I'm here to help. Can you tell me more about how you're feeling?"

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Groq API error:", error)
    return NextResponse.json(
      { error: "Failed to generate response", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
