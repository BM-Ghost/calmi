"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Shield,
  Heart,
  AlertTriangle,
  Activity,
  Zap,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin
} from "lucide-react"
import ChatInterface from "@/components/chat-interface"

export default function NeuroSymbolicChatbot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">

            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Calmi - Mental Health Assistant
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Feel heard, stay safe—with Calmi, your calm and intelligent companion.
          </p>

          {/* Key Features */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              Rule-based Safety
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              ML Empathy
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              Symptom Detection
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              Real-time Analysis
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-6">
          <ChatInterface />
        </div>

        {/* Footer Info */}
        <Card className="mt-2 border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="h-5 w-5" />
              Important Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent className="text-amber-700">
            <p>
              This is not a substitute for professional mental health care. If you're experiencing a mental health crisis,
              please contact a qualified healthcare provider or emergency services immediately.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Clean Footer with Icons Below */}
      <footer className="text-sm text-gray-500 mt-2 border-t pt-4 px-4 pb-6 text-center">
        <p className="mb-3">
          © {new Date().getFullYear()} Bwire
        </p>
        <div className="flex items-center justify-center gap-5 text-gray-600">
          <a href="mailto:bmwandera14@gmail.com" className="hover:text-blue-600" title="Email">
            <Mail className="h-5 w-5" />
          </a>
          <a href="tel:+254794142204" className="hover:text-blue-600" title="Phone">
            <Phone className="h-5 w-5" />
          </a>
          <a
            href="https://meshackbwire.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
            title="Portfolio"
          >
            <Globe className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/meshack-bwire-b2390a213/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
            title="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </footer>
    </div>
  )
}
