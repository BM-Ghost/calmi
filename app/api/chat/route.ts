import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, analysis } = await request.json()

    // Return a simple response that will trigger client-side Puter.js processing
    return NextResponse.json({
      message,
      analysis,
      useClientSide: true,
    })
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
