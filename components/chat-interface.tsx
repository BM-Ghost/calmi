"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, User, Shield, AlertTriangle, Heart, Brain, RotateCcw } from "lucide-react"
import { analyzeMessage } from "@/lib/neuro-symbolic-engine"
import CrisisReferralModal from "./crisis-referral-modal"
import type { ChatMessage } from "@/lib/types"

// Conversation context interface
interface ConversationContext {
  sessionId: string
  startTime: Date
  messageCount: number
  detectedSymptoms: string[]
  riskHistory: string[]
  emotionalTrends: string[]
  keyTopics: string[]
  therapeuticGoals: string[]
}

export default function ChatInterface() {
const [messages, setMessages] = useState<ChatMessage[]>([
  {
    id: "1",
    content:
      "Hi, I’m **Dr. Calmi**. This is a safe and supportive space where we can talk through whatever's on your mind. Our conversation is private, and I’m here to offer both **empathetic understanding** and **practical guidance**.\n\n**How are you feeling today**, and what would you like to talk about?",
    sender: "bot",
    timestamp: new Date(),
    analysis: {
      riskLevel: "low",
      symptoms: [],
      sentiment: { score: 0.8, label: "positive" },
      emotions: [{ emotion: "supportive", confidence: 0.9 }],
      safetyFlags: [],
      escalationRequired: false,
      responseStrategy: "supportive",
    },
  },
])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showCrisisModal, setShowCrisisModal] = useState(false)
  const [crisisData, setCrisisData] = useState<any>(null)
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    sessionId: `session_${Date.now()}`,
    startTime: new Date(),
    messageCount: 0,
    detectedSymptoms: [],
    riskHistory: [],
    emotionalTrends: [],
    keyTopics: [],
    therapeuticGoals: [],
  })
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  // Update conversation context based on analysis
  const updateConversationContext = (analysis: any, message: string) => {
    setConversationContext((prev) => {
      const newContext = { ...prev }
      newContext.messageCount += 1

      // Track symptoms over time
      const newSymptoms = analysis.symptoms.map((s: any) => s.symptom)
      newSymptoms.forEach((symptom: string) => {
        if (!newContext.detectedSymptoms.includes(symptom)) {
          newContext.detectedSymptoms.push(symptom)
        }
      })

      // Track risk levels
      if (!newContext.riskHistory.includes(analysis.riskLevel)) {
        newContext.riskHistory.push(analysis.riskLevel)
      }

      // Track emotional trends
      const emotionalState = `${analysis.sentiment.label} (${Math.round(analysis.sentiment.score * 100)}%)`
      if (
        newContext.emotionalTrends.length === 0 ||
        newContext.emotionalTrends[newContext.emotionalTrends.length - 1] !== emotionalState
      ) {
        newContext.emotionalTrends.push(emotionalState)
        // Keep only last 5 emotional states
        if (newContext.emotionalTrends.length > 5) {
          newContext.emotionalTrends = newContext.emotionalTrends.slice(-5)
        }
      }

      // Extract key topics from message
      const lowerMessage = message.toLowerCase()
      const topics = []
      if (lowerMessage.includes("work") || lowerMessage.includes("job") || lowerMessage.includes("career"))
        topics.push("work")
      if (
        lowerMessage.includes("family") ||
        lowerMessage.includes("parent") ||
        lowerMessage.includes("mother") ||
        lowerMessage.includes("father")
      )
        topics.push("family")
      if (
        lowerMessage.includes("relationship") ||
        lowerMessage.includes("partner") ||
        lowerMessage.includes("girlfriend") ||
        lowerMessage.includes("boyfriend")
      )
        topics.push("relationships")
      if (lowerMessage.includes("school") || lowerMessage.includes("study") || lowerMessage.includes("college"))
        topics.push("education")
      if (lowerMessage.includes("sleep") || lowerMessage.includes("tired") || lowerMessage.includes("insomnia"))
        topics.push("sleep")
      if (lowerMessage.includes("money") || lowerMessage.includes("financial") || lowerMessage.includes("debt"))
        topics.push("finances")
      if (lowerMessage.includes("health") || lowerMessage.includes("sick") || lowerMessage.includes("pain"))
        topics.push("health")

      topics.forEach((topic) => {
        if (!newContext.keyTopics.includes(topic)) {
          newContext.keyTopics.push(topic)
        }
      })

      return newContext
    })
  }

  const generateTherapistResponse = async (message: string, analysis: any): Promise<string> => {
    // Update conversation context
    updateConversationContext(analysis, message)

    // Check for crisis situation and trigger referral modal
    if (analysis.escalationRequired || analysis.riskLevel === "high") {
      const conversationHistory = messages
        .map((msg) => `${msg.sender === "user" ? "User" : "Dr. Calmi"}: ${msg.content}`)
        .join("\n\n")

      setCrisisData({
        conversationHistory: conversationHistory + `\n\nUser: ${message}`,
        riskLevel: analysis.riskLevel,
        symptoms: analysis.symptoms.map((s: any) => s.symptom),
      })

      // Show crisis modal after a brief delay to allow message to be displayed
      setTimeout(() => setShowCrisisModal(true), 1000)
    }

    // Get the last few messages for immediate context
    const recentMessages = messages.slice(-8) // Last 8 messages for better context
    const conversationFlow = recentMessages
      .map((msg) => `${msg.sender === "user" ? "User" : "Dr. Calmi"}: ${msg.content}`)
      .join("\n")

    // Build therapeutic context
    const sessionContext = `
Session Context:
- Duration: ${Math.round((Date.now() - conversationContext.startTime.getTime()) / (1000 * 60))} minutes
- Messages exchanged: ${conversationContext.messageCount}
- Key topics discussed: ${conversationContext.keyTopics.join(", ") || "Initial conversation"}
- Detected concerns: ${conversationContext.detectedSymptoms.join(", ") || "None identified yet"}
- Emotional journey: ${conversationContext.emotionalTrends.slice(-3).join(" → ") || "Beginning assessment"}
`

    const therapistPrompt = `You are **Dr. Calmi**, a highly skilled and compassionate Mental Health Assistant. You combine evidence-based therapeutic approaches with advanced AI to provide exceptional mental health support.

**CORE THERAPEUTIC PRINCIPLES:**
1. **Empathetic Validation**: Always acknowledge and validate the user's emotions first
2. **Solution-Oriented**: Provide practical, actionable strategies and coping mechanisms  
3. **Professional Boundaries**: Maintain therapeutic professionalism while being warm and approachable
4. **Safety First**: Prioritize user safety and wellbeing in all interactions
5. **Therapeutic Questioning**: Ask insightful questions that promote self-reflection and growth

**CONVERSATION STYLE GUIDELINES:**
- Use **bold text** to emphasize important therapeutic concepts, emotions, and key insights
- Structure responses with clear therapeutic sections when providing guidance
- Ask ONE focused, therapeutic question that encourages deeper exploration
- Provide specific coping strategies, techniques, and actionable steps
- Validate emotions before offering solutions or perspectives
- Use professional yet warm language that builds trust and rapport
- Reference previous conversation elements to show active listening and continuity

**THERAPEUTIC RESPONSE FRAMEWORK:**
1. **Emotional Validation**: Acknowledge their feelings with empathy
2. **Therapeutic Insight**: Offer professional perspective or reframing
3. **Practical Solutions**: Provide specific strategies, techniques, or coping mechanisms
4. **Guided Exploration**: Ask one thoughtful question to deepen understanding
5. **Supportive Reinforcement**: Remind them of their strengths and your ongoing support

${sessionContext}

**RECENT CONVERSATION CONTEXT:**
${conversationFlow}

**CURRENT USER MESSAGE:** "${message}"

**CLINICAL ANALYSIS:**
- Risk Level: ${analysis.riskLevel}
- Identified Concerns: ${analysis.symptoms.map((s: any) => s.symptom).join(", ") || "none detected"}
- Emotional State: ${analysis.sentiment.label} (${Math.round(analysis.sentiment.score * 100)}% confidence)
- Safety Considerations: ${analysis.safetyFlags.join(", ") || "no immediate concerns"}

**RESPONSE INSTRUCTIONS:**
Respond as Dr. Calmi with professional therapeutic expertise. Provide a response that:
- Validates their current emotional state with **empathy**
- Offers **practical therapeutic strategies** relevant to their situation
- Includes **one focused question** that promotes therapeutic exploration
- Uses **bold formatting** for key therapeutic concepts and emotional validation
- Maintains professional boundaries while being genuinely supportive
- Demonstrates active listening by referencing their specific concerns

Remember: You are a mental health professional providing evidence-based support with compassionate care.`

    try {
      console.log("Generating therapeutic response with Groq AI...")

      const response = await fetch("/api/groq-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: therapistPrompt,
          conversationHistory: conversationFlow,
        }),
      })

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`)
      }

      const data = await response.json()
      console.log("Therapeutic response generated successfully")
      return data.response
    } catch (error) {
      console.error("Groq error:", error)

      // Professional fallback responses based on analysis
      const lowerMessage = message.toLowerCase()

      // Crisis response (highest priority)
      if (analysis.escalationRequired) {
        return `I'm **deeply concerned** about what you've shared with me, and I want you to know that **you are not alone** in this moment. What you're experiencing is serious, and **your life has immense value**.\n\nI'm going to connect you with a qualified mental health professional who can provide **immediate, specialized support**. This is not something you need to face by yourself.\n\n**Right now, please know**: Your feelings are valid, help is available, and there are people who care about your wellbeing.`
      }

      // High risk response
      if (analysis.riskLevel === "high") {
        return `I can hear that you're going through something **incredibly difficult** right now, and I want to acknowledge the **courage** it takes to share these feelings with me.\n\nThese emotions you're experiencing are **significant and deserve attention**. Sometimes when we're in pain, it can feel overwhelming and isolating.\n\n**Let's work through this together**. Can you help me understand what specific situation or feelings have been the most challenging for you recently?`
      }
      
      // Anxiety/stress response
      if (analysis.symptoms.some((s: any) => ["anxiety", "stress", "panic"].includes(s.symptom))) {
        return `I recognize that you're experiencing **significant anxiety**, and I want you to know that **these feelings are completely valid**. Anxiety can feel overwhelming, but there are **effective strategies** we can use to help you manage these feelings.\n\n**Immediate coping techniques**:\n• **Deep breathing**: Try the 4-7-8 technique (inhale for 4, hold for 7, exhale for 8)\n• **Grounding**: Name 5 things you can see, 4 you can touch, 3 you can hear\n• **Self-compassion**: Remind yourself that anxiety is temporary and manageable\n\n**What specific situations or thoughts tend to trigger your anxiety most intensely?**`
      }

      // General supportive response
      return `Thank you for **trusting me** with your thoughts and feelings. I'm experiencing some technical difficulties right now, but I want you to know that **I'm still here to support you** and our safety monitoring systems remain fully active.\n\n**Your wellbeing is my priority**, and I'm committed to helping you work through whatever you're experiencing.\n\n**How are you feeling in this moment**, and what would be most helpful for you right now?`
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = input
    setInput("")
    setIsLoading(true)

    try {
      // Analyze user message with neuro-symbolic engine
      const analysis = await analyzeMessage(currentInput)

      // Generate therapist response with conversation memory
      const botResponse = await generateTherapistResponse(currentInput, analysis)

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
        analysis: {
          riskLevel: "low",
          symptoms: [],
          sentiment: { score: 0.8, label: "positive" },
          emotions: [{ emotion: "therapeutic", confidence: 0.9 }],
          safetyFlags: [],
          escalationRequired: false,
          responseStrategy: "supportive",
        },
      }

      setMessages((prev) => [...prev.slice(0, -1), { ...userMessage, analysis }, botMessage])
    } catch (error) {
      console.error("Error processing message:", error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content:
          "I apologize for the technical difficulty. However, **I want you to know that I'm still here to support you**. Our safety monitoring systems remain active to ensure your wellbeing.\n\n**Your mental health matters**, and I'm committed to helping you through whatever you're experiencing. **How can I best support you right now?**",
        sender: "bot",
        timestamp: new Date(),
        analysis: {
          riskLevel: "low",
          symptoms: [],
          sentiment: { score: 0.5, label: "neutral" },
          emotions: [],
          safetyFlags: [],
          escalationRequired: false,
          responseStrategy: "supportive",
        },
      }
      setMessages((prev) => [...prev.slice(0, -1), { ...userMessage }, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const resetConversation = () => {
    setMessages([
      {
        id: "1",
        content:
          "Hello, and welcome to our safe space. I'm **Dr. Calmi**, your dedicated Mental Health Assistant. I'm here to provide you with **compassionate support**, help you process your emotions, and guide you toward **better mental wellness**.\n\nI use a unique approach that combines evidence-based therapeutic techniques with advanced AI to ensure you receive both **empathetic understanding** and **practical solutions**. Our conversation is completely confidential, and I'm equipped with safety protocols to ensure your wellbeing at all times.\n\nI'd like to start by getting to know you better. **How are you feeling today**, and what brings you here to talk with me?",
        sender: "bot",
        timestamp: new Date(),
        analysis: {
          riskLevel: "low",
          symptoms: [],
          sentiment: { score: 0.8, label: "positive" },
          emotions: [{ emotion: "supportive", confidence: 0.9 }],
          safetyFlags: [],
          escalationRequired: false,
          responseStrategy: "supportive",
        },
      },
    ])
    setConversationContext({
      sessionId: `session_${Date.now()}`,
      startTime: new Date(),
      messageCount: 0,
      detectedSymptoms: [],
      riskHistory: [],
      emotionalTrends: [],
      keyTopics: [],
      therapeuticGoals: [],
    })
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Chat Area */}
        <Card className="xl:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-base sm:text-lg">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-600" />
                  <span>Dr. Calmi - Professional Mental Health Support</span>
                </div>
              </CardTitle>
              <Button
                onClick={resetConversation}
                variant="outline"
                size="sm"
                className="self-start sm:self-auto bg-transparent"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                New Session
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[60vh] sm:h-[70vh] p-3 sm:p-4" ref={scrollAreaRef}>
              <div className="space-y-3 sm:space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 sm:gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex gap-2 max-w-[85%] sm:max-w-[80%] ${
                        message.sender === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === "user" ? "bg-blue-500" : "bg-gradient-to-br from-pink-500 to-purple-600"
                        }`}
                      >
                        {message.sender === "user" ? (
                          <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                        ) : (
                          <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                        )}
                      </div>
                      <div
                        className={`rounded-lg p-3 sm:p-4 ${
                          message.sender === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gradient-to-br from-gray-50 to-purple-50 text-gray-900 border border-purple-100"
                        }`}
                      >
                        <div
                          className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: message.content.replace(
                              /\*\*(.*?)\*\*/g,
                              '<strong class="font-semibold text-purple-700">$1</strong>',
                            ),
                          }}
                        />
                        <p className="text-xs opacity-70 mt-2 flex items-center gap-1">
                          {message.sender === "bot" && <Heart className="h-3 w-3" />}
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2 sm:gap-3 justify-start">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                      <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-purple-50 border border-purple-100 rounded-lg p-3 sm:p-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-xs text-purple-600">Dr. Calmi is thoughtfully responding...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="p-3 sm:p-4 border-t bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Share your thoughts and feelings with Dr. Calmi..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  disabled={isLoading}
                  className="text-sm border-purple-200 focus:border-purple-400"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  size="sm"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Safe, confidential space • Professional therapeutic support • {conversationContext.messageCount}{" "}
                messages exchanged
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Analysis Panel */}
        <Card className="h-fit border-purple-200">
          <CardHeader className="pb-3 bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="flex items-center gap-2 text-base text-purple-800">
              <Brain className="h-5 w-5" />
              Therapeutic Session Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {/* Session Overview */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2 text-sm flex items-center gap-1">
                <Heart className="h-4 w-4" />
                Session Overview
              </h4>
              <div className="text-xs text-blue-700 space-y-1">
                <p>
                  <strong>Duration:</strong>{" "}
                  {Math.round((Date.now() - conversationContext.startTime.getTime()) / (1000 * 60))} minutes
                </p>
                <p>
                  <strong>Messages:</strong> {conversationContext.messageCount}
                </p>
                {conversationContext.keyTopics.length > 0 && (
                  <p>
                    <strong>Topics:</strong> {conversationContext.keyTopics.join(", ")}
                  </p>
                )}
              </div>
            </div>

            {/* Current Analysis */}
            {messages.length > 1 && messages[messages.length - 2].analysis && (
              <>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-1 text-sm">
                    <Shield className="h-4 w-4" />
                    Risk Assessment
                  </h4>
                  <Badge className={getRiskColor(messages[messages.length - 2].analysis!.riskLevel)}>
                    {messages[messages.length - 2].analysis!.riskLevel.toUpperCase()} RISK
                  </Badge>
                </div>

                {/* Therapeutic Concerns */}
                {conversationContext.detectedSymptoms.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Identified Concerns</h4>
                    <div className="space-y-1">
                      {conversationContext.detectedSymptoms.map((symptom, index) => (
                        <Badge key={index} variant="outline" className="mr-1 text-xs border-purple-200 text-purple-700">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Emotional Journey */}
                {conversationContext.emotionalTrends.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-1 text-sm">
                      <Heart className="h-4 w-4" />
                      Emotional Journey
                    </h4>
                    <div className="text-xs text-gray-600 bg-pink-50 p-2 rounded border border-pink-200">
                      {conversationContext.emotionalTrends.join(" → ")}
                    </div>
                  </div>
                )}

                {messages[messages.length - 2].analysis!.safetyFlags.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-1 text-red-600 text-sm">
                      <AlertTriangle className="h-4 w-4" />
                      Safety Alerts
                    </h4>
                    <div className="space-y-1">
                      {messages[messages.length - 2].analysis!.safetyFlags.map((flag, index) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          {flag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold mb-2 text-sm">Therapeutic Approach</h4>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    {messages[messages.length - 2].analysis!.responseStrategy}
                  </Badge>
                </div>

                <div className="mt-4 p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <h5 className="font-semibold text-purple-800 mb-1 text-sm flex items-center gap-1">
                    <Brain className="h-4 w-4" />
                    Neuro-Symbolic Processing
                  </h5>
                  <p className="text-xs text-purple-700 leading-relaxed">
                    🧠 <strong>Symbolic AI:</strong> Rule-based safety & pattern recognition
                    <br />🤖 <strong>Neural AI:</strong> Empathetic understanding & therapeutic responses
                    <br />🔗 <strong>Hybrid Integration:</strong> Combined clinical decision making
                    <br />💭 <strong>Therapeutic Memory:</strong> Continuous context & progress tracking
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Crisis Referral Modal */}
      {showCrisisModal && crisisData && (
        <CrisisReferralModal
          isOpen={showCrisisModal}
          onClose={() => setShowCrisisModal(false)}
          conversationHistory={crisisData.conversationHistory}
          riskLevel={crisisData.riskLevel}
          symptoms={crisisData.symptoms}
        />
      )}
    </>
  )
}
