"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Brain, Shield, Zap, Activity, AlertTriangle, Heart, Database, Cpu, Network } from "lucide-react"

export default function SystemArchitecture() {
  return (
    <div className="space-y-6">
      {/* Architecture Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Neuro-Symbolic Architecture Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                Symbolic Components (Rule-Based)
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  Safety Guardrails & Crisis Detection
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  High-Risk Phrase Matching
                </li>
                <li className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-600" />
                  Escalation Protocol Logic
                </li>
                <li className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-purple-600" />
                  Knowledge Base Rules
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Network className="h-4 w-4" />
                Neural Components (ML-Based)
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-pink-600" />
                  Sentiment & Emotion Analysis
                </li>
                <li className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-indigo-600" />
                  NLP Symptom Extraction
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-600" />
                  Context Understanding
                </li>
                <li className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-green-600" />
                  Response Generation
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle>Message Processing Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Input Processing</h4>
                <p className="text-sm text-gray-600">User message received and preprocessed</p>
              </div>
              <Badge variant="secondary">Preprocessing</Badge>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg">
              <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-semibold flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Safety Screening (Symbolic)
                </h4>
                <p className="text-sm text-gray-600">Rule-based crisis detection and risk assessment</p>
              </div>
              <Badge variant="destructive">Critical</Badge>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-semibold flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  NLP Analysis (Neural)
                </h4>
                <p className="text-sm text-gray-600">Symptom extraction, sentiment analysis, emotion detection</p>
              </div>
              <Badge variant="secondary">ML Processing</Badge>
            </div>

            {/* Step 4 */}
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Hybrid Decision Making</h4>
                <p className="text-sm text-gray-600">Combine symbolic rules with neural insights</p>
              </div>
              <Badge variant="secondary">Fusion</Badge>
            </div>

            {/* Step 5 */}
            <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg">
              <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <div className="flex-1">
                <h4 className="font-semibold flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Response Generation
                </h4>
                <p className="text-sm text-gray-600">Generate empathetic, contextually appropriate response</p>
              </div>
              <Badge variant="secondary">Output</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Implementation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Safety Guardrails (Symbolic)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Crisis Keywords</h4>
              <div className="flex flex-wrap gap-1">
                <Badge variant="destructive" className="text-xs">
                  suicide
                </Badge>
                <Badge variant="destructive" className="text-xs">
                  kill myself
                </Badge>
                <Badge variant="destructive" className="text-xs">
                  end it all
                </Badge>
                <Badge variant="destructive" className="text-xs">
                  no point
                </Badge>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-2">Risk Patterns</h4>
              <ul className="text-sm space-y-1">
                <li>• Hopelessness expressions</li>
                <li>• Self-harm indicators</li>
                <li>• Isolation statements</li>
                <li>• Substance abuse mentions</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-2">Escalation Rules</h4>
              <ul className="text-sm space-y-1">
                <li>• Immediate crisis → Emergency resources</li>
                <li>• High risk → Professional referral</li>
                <li>• Medium risk → Coping strategies</li>
                <li>• Low risk → Supportive conversation</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ML Components (Neural)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Sentiment Analysis</h4>
              <p className="text-sm text-gray-600 mb-2">AI SDK-powered emotion detection</p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">Positive</Badge>
                <Badge variant="outline">Negative</Badge>
                <Badge variant="outline">Neutral</Badge>
                <Badge variant="outline">Mixed</Badge>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-2">Symptom Extraction</h4>
              <p className="text-sm text-gray-600 mb-2">NLP-based mental health indicators</p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">Anxiety</Badge>
                <Badge variant="outline">Depression</Badge>
                <Badge variant="outline">Stress</Badge>
                <Badge variant="outline">Insomnia</Badge>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-2">Context Understanding</h4>
              <ul className="text-sm space-y-1">
                <li>• Conversation history analysis</li>
                <li>• Emotional state tracking</li>
                <li>• Response appropriateness</li>
                <li>• Empathy calibration</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Benefits of Neuro-Symbolic Approach */}
      <Card>
        <CardHeader>
          <CardTitle>Why Neuro-Symbolic for Mental Health?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-600">Advantages</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>
                    <strong>Safety First:</strong> Hard-coded safety rules prevent harmful responses
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="h-4 w-4 text-pink-600 mt-0.5" />
                  <span>
                    <strong>Empathetic AI:</strong> ML provides nuanced emotional understanding
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Brain className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span>
                    <strong>Explainable:</strong> Clear reasoning behind decisions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <span>
                    <strong>Fast & Reliable:</strong> Efficient hybrid processing
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-blue-600">Use Cases</h4>
              <ul className="space-y-2 text-sm">
                <li>• Crisis intervention and prevention</li>
                <li>• 24/7 mental health support</li>
                <li>• Therapy session preparation</li>
                <li>• Mood tracking and analysis</li>
                <li>• Resource recommendation</li>
                <li>• Peer support facilitation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
