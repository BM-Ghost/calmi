// Puter.js AI integration utilities
declare global {
  interface Window {
    puter: {
      ai: {
        chat: (prompt: string, options?: { model?: string; stream?: boolean }) => Promise<any>
      }
    }
  }
}

export async function analyzeSentimentWithPuter(message: string): Promise<{
  score: number
  label: "positive" | "negative" | "neutral"
}> {
  try {
    const prompt = `Analyze the sentiment of this message and respond with only a JSON object containing "score" (number between 0-1, where 0 is very negative, 0.5 is neutral, 1 is very positive) and "label" (positive/negative/neutral):

Message: "${message}"

Response format: {"score": 0.3, "label": "negative"}`

    const response = await window.puter.ai.chat(prompt, { model: "gpt-4o-mini" })
    const parsed = JSON.parse(response.trim())

    return {
      score: Math.max(0, Math.min(1, parsed.score)),
      label: parsed.label,
    }
  } catch (error) {
    console.error("Puter sentiment analysis error:", error)
    // Fallback to simple keyword-based sentiment
    const lowerMessage = message.toLowerCase()
    const positiveWords = ["good", "happy", "better", "hope", "grateful", "thankful"]
    const negativeWords = ["bad", "sad", "worse", "terrible", "awful", "hate"]

    const positiveCount = positiveWords.filter((word) => lowerMessage.includes(word)).length
    const negativeCount = negativeWords.filter((word) => lowerMessage.includes(word)).length

    if (positiveCount > negativeCount) {
      return { score: 0.7, label: "positive" }
    } else if (negativeCount > positiveCount) {
      return { score: 0.3, label: "negative" }
    } else {
      return { score: 0.5, label: "neutral" }
    }
  }
}

export async function detectEmotionsWithPuter(message: string): Promise<
  Array<{
    emotion: string
    confidence: number
  }>
> {
  try {
    const prompt = `Detect the primary emotions in this message. Respond with only a JSON array of emotion objects with "emotion" and "confidence" (0-1):

Message: "${message}"

Possible emotions: joy, sadness, anger, fear, surprise, disgust, anxiety, hope, despair, frustration, relief, guilt, shame, loneliness, overwhelmed

Response format: [{"emotion": "sadness", "confidence": 0.8}, {"emotion": "anxiety", "confidence": 0.6}]`

    const response = await window.puter.ai.chat(prompt, { model: "gpt-4o-mini" })
    return JSON.parse(response.trim())
  } catch (error) {
    console.error("Puter emotion detection error:", error)
    // Fallback emotion detection
    return [{ emotion: "neutral", confidence: 0.5 }]
  }
}

export async function generateChatResponseWithPuter(message: string, analysis: any): Promise<string> {
  try {
    const systemContext = `You are a helpful AI assistant with a focus on mental health support. You can answer general questions about any topic, but you also have special training in mental health and emotional support.

When responding:
1. Answer general questions normally and helpfully like ChatGPT
2. If the conversation relates to mental health, be empathetic and supportive
3. If you detect crisis situations, gently suggest professional help
4. Be conversational and friendly

Current analysis of the user's message:
- Risk Level: ${analysis.riskLevel}
- Detected Symptoms: ${analysis.symptoms.map((s: any) => s.symptom).join(", ") || "none"}
- Sentiment: ${analysis.sentiment.label} (${Math.round(analysis.sentiment.score * 100)}%)
- Safety Flags: ${analysis.safetyFlags.join(", ") || "none"}

User message: "${message}"

Respond naturally and appropriately based on this context:`

    const response = await window.puter.ai.chat(systemContext, { model: "gpt-4o" })
    return response
  } catch (error) {
    console.error("Puter chat response error:", error)

    // Fallback response based on analysis
    if (analysis.escalationRequired) {
      return "I'm concerned about what you've shared. It's important that you speak with a mental health professional or crisis counselor right away. Would you like me to help you find resources in your area?"
    } else if (analysis.riskLevel === "high") {
      return "I hear that you're going through a really difficult time. Your feelings are valid, and you don't have to face this alone. Have you considered speaking with a counselor or therapist?"
    } else if (analysis.symptoms.length > 0) {
      const symptomText = analysis.symptoms.map((s: any) => s.symptom).join(", ")
      return `I notice you mentioned feeling ${symptomText}. These feelings can be really challenging. Can you tell me more about what's been going on?`
    } else {
      return "I'm here to help with any questions you have. Feel free to ask me about anything - from general knowledge to how you're feeling today."
    }
  }
}
