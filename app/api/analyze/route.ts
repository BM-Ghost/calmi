import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, type } = await request.json()

    // Return a simple response that will trigger client-side Puter.js processing
    return NextResponse.json({
      message,
      type,
      useClientSide: true,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}
