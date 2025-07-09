export interface Symptom {
  symptom: string
  confidence: number
  evidence?: string[]
}

export interface Emotion {
  emotion: string
  confidence: number
}

export interface MessageAnalysis {
  riskLevel: "low" | "medium" | "high"
  symptoms: Symptom[]
  sentiment: {
    score: number
    label: "positive" | "negative" | "neutral"
  }
  emotions: Emotion[]
  safetyFlags: string[]
  escalationRequired: boolean
  responseStrategy: "crisis" | "supportive" | "referral" | "coping"
}

export interface ChatMessage {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  analysis?: MessageAnalysis
}
