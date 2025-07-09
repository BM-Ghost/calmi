"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Mail, Phone, Heart, CheckCircle } from "lucide-react"

interface CrisisReferralModalProps {
  isOpen: boolean
  onClose: () => void
  conversationHistory: string
  riskLevel: string
  symptoms: string[]
}

export default function CrisisReferralModal({
  isOpen,
  onClose,
  conversationHistory,
  riskLevel,
  symptoms,
}: CrisisReferralModalProps) {
  const [email, setEmail] = useState("")
  const [consent, setConsent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [professional, setProfessional] = useState<any>(null)

  if (!isOpen) return null

  const handleSendReferral = async () => {
    if (!email || !consent) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/send-referral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: email,
          conversationReport: conversationHistory,
          riskLevel,
          symptoms,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setProfessional(result.professional)
        setIsSuccess(true)
      } else {
        throw new Error("Failed to send referral")
      }
    } catch (error) {
      console.error("Referral error:", error)
      alert("There was an error sending the referral. Please contact emergency services directly.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
            <CardTitle className="text-green-800">Referral Sent Successfully</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                I've connected you with a qualified mental health professional:
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800">{professional?.name}</h4>
                <p className="text-sm text-green-700">{professional?.specialty}</p>
                <p className="text-sm text-green-700 flex items-center gap-1 mt-2">
                  <Phone className="h-4 w-4" />
                  {professional?.phone}
                </p>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">Immediate Help Available:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>
                  • National Suicide Prevention Lifeline: <strong>988</strong>
                </li>
                <li>
                  • Crisis Text Line: Text <strong>HOME</strong> to <strong>741741</strong>
                </li>
                <li>
                  • Emergency Services: <strong>911</strong>
                </li>
              </ul>
            </div>

            <p className="text-xs text-gray-500 text-center">
              You should receive an email shortly with detailed information and resources.
            </p>

            <Button onClick={onClose} className="w-full">
              Continue Conversation
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            Professional Mental Health Referral
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-800">
              I'm concerned about your wellbeing and want to connect you with a qualified mental health professional who
              can provide immediate, specialized support. You don't have to face this alone.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Your Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                We'll send you professional contact information and resources
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Consent for Professional Referral</Label>
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="consent" className="text-xs text-gray-600">
                  I consent to sharing a summary of our conversation with a qualified mental health professional for the
                  purpose of receiving appropriate care and support. I understand this is to ensure my safety and
                  wellbeing.
                </label>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-semibold text-blue-800 text-sm mb-2">What happens next:</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• You'll receive professional contact information via email</li>
                <li>• A qualified therapist will be notified about your situation</li>
                <li>• You'll get immediate crisis resources and support numbers</li>
                <li>• Professional follow-up within 24 hours</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg">
              <h4 className="font-semibold text-yellow-800 text-sm mb-2">Immediate Crisis Resources:</h4>
              <ul className="text-xs text-yellow-700 space-y-1">
                <li>
                  • National Suicide Prevention Lifeline: <strong>988</strong>
                </li>
                <li>
                  • Crisis Text Line: Text <strong>HOME</strong> to <strong>741741</strong>
                </li>
                <li>
                  • Emergency Services: <strong>911</strong>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleSendReferral}
              disabled={!email || !consent || isLoading}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              {isLoading ? (
                <>
                  <Mail className="h-4 w-4 mr-2 animate-spin" />
                  Sending Referral...
                </>
              ) : (
                <>
                  <Heart className="h-4 w-4 mr-2" />
                  Get Professional Help
                </>
              )}
            </Button>
            <Button onClick={onClose} variant="outline">
              Not Now
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Your privacy is important. Information is only shared with licensed professionals for your care.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
