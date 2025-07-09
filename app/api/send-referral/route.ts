// app/api/send-referral/route.ts
import { NextRequest, NextResponse } from "next/server"
import { sendReferralEmail } from "@/lib/email"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userEmail, conversationReport, riskLevel, symptoms } = body

    if (!userEmail || !conversationReport || !riskLevel) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const result = await sendReferralEmail({
      userEmail,
      conversationReport,
      riskLevel,
      symptoms,
    })

    if (result.success) {
      return NextResponse.json({ success: true, professional: result.professional })
    }

    return NextResponse.json({ success: false, error: "Failed to send referral" }, { status: 500 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
