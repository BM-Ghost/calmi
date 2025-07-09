"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Shield, Heart, AlertTriangle, Activity, Zap, BookOpen } from "lucide-react"
import ChatInterface from "@/components/chat-interface"

export default function NeuroSymbolicChatbot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-purple-600" />
            <Heart className="h-8 w-8 text-pink-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Calmi - Mental Health Assistant
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A hybrid AI system combining rule-based safety guardrails with ML-powered empathy for safe, ethical mental
            health support. Demonstrating the power of neuro-symbolic AI in healthcare.
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
            <Badge variant="secondary" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              Educational Demo
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-6">
          <ChatInterface />
        </div>

        {/* Footer Info */}
        <Card className="mt-8 border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="h-5 w-5" />
              Important Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent className="text-amber-700">
            <p>
              This is a demonstration of neuro-symbolic AI technology for educational and research purposes. It is not a
              substitute for professional mental health care. If you're experiencing a mental health crisis, please
              contact a qualified healthcare provider or emergency services immediately.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
