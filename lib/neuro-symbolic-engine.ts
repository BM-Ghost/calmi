import type { MessageAnalysis, Symptom } from "./types"

// Symbolic AI: Rule-based safety patterns
const CRISIS_KEYWORDS = [
  "suicide",
  "kill myself",
  "end it all",
  "no point living",
  "want to die",
  "better off dead",
  "end my life",
  "take my own life",
  "not worth living",
]

const HIGH_RISK_PATTERNS = [
  "hopeless",
  "worthless",
  "burden",
  "trapped",
  "no way out",
  "can't go on",
  "give up",
  "nothing matters",
  "empty inside",
]

const SYMPTOM_PATTERNS = {
  anxiety: ["anxious", "worried", "panic", "nervous", "scared", "fear", "overwhelmed"],
  depression: ["sad", "depressed", "down", "hopeless", "empty", "numb", "worthless"],
  stress: ["stressed", "pressure", "overwhelmed", "tense", "exhausted", "burned out"],
  insomnia: ["can't sleep", "insomnia", "sleepless", "tired", "exhausted", "restless"],
  panic: ["panic attack", "can't breathe", "heart racing", "dizzy", "shaking"],
}

// Symbolic AI: Safety screening function
function performSafetyScreening(message: string): {
  riskLevel: "low" | "medium" | "high"
  safetyFlags: string[]
  escalationRequired: boolean
} {
  const lowerMessage = message.toLowerCase()
  const safetyFlags: string[] = []
  let riskLevel: "low" | "medium" | "high" = "low"
  let escalationRequired = false

  // Check for crisis keywords (highest priority)
  for (const keyword of CRISIS_KEYWORDS) {
    if (lowerMessage.includes(keyword)) {
      safetyFlags.push(`Crisis keyword: ${keyword}`)
      riskLevel = "high"
      escalationRequired = true
    }
  }

  // Check for high-risk patterns
  let highRiskCount = 0
  for (const pattern of HIGH_RISK_PATTERNS) {
    if (lowerMessage.includes(pattern)) {
      safetyFlags.push(`High-risk pattern: ${pattern}`)
      highRiskCount++
    }
  }

  if (highRiskCount >= 2 && riskLevel !== "high") {
    riskLevel = "high"
  } else if (highRiskCount >= 1 && riskLevel === "low") {
    riskLevel = "medium"
  }

  return { riskLevel, safetyFlags, escalationRequired }
}

// Symbolic AI: Symptom extraction using pattern matching
function extractSymptoms(message: string): Symptom[] {
  const lowerMessage = message.toLowerCase()
  const symptoms: Symptom[] = []

  for (const [symptomType, patterns] of Object.entries(SYMPTOM_PATTERNS)) {
    let matchCount = 0
    const matchedPatterns: string[] = []

    for (const pattern of patterns) {
      if (lowerMessage.includes(pattern)) {
        matchCount++
        matchedPatterns.push(pattern)
      }
    }

    if (matchCount > 0) {
      // Calculate confidence based on pattern matches and context
      const confidence = Math.min(0.9, 0.5 + matchCount * 0.2)
      symptoms.push({
        symptom: symptomType,
        confidence,
        evidence: matchedPatterns,
      })
    }
  }

  return symptoms.sort((a, b) => b.confidence - a.confidence)
}

// Simple sentiment analysis fallback
function analyzeSentimentFallback(message: string): {
  score: number
  label: "positive" | "negative" | "neutral"
} {
  const lowerMessage = message.toLowerCase()
  const positiveWords = ["good", "happy", "better", "hope", "grateful", "thankful", "great", "wonderful", "amazing"]
  const negativeWords = ["bad", "sad", "worse", "terrible", "awful", "hate", "horrible", "depressed", "anxious"]

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

// Main neuro-symbolic analysis function
export async function analyzeMessage(message: string): Promise<MessageAnalysis> {
  // Step 1: Symbolic safety screening (highest priority)
  const safetyResult = performSafetyScreening(message)

  // Step 2: Symbolic symptom extraction
  const symptoms = extractSymptoms(message)

  // Step 3: Sentiment analysis (fallback mode)
  const sentiment = analyzeSentimentFallback(message)

  // Step 4: Simple emotion detection (fallback mode)
  const emotions = [{ emotion: "neutral", confidence: 0.5 }]

  // Step 5: Hybrid decision making
  let responseStrategy: "crisis" | "supportive" | "referral" | "coping" = "supportive"

  if (safetyResult.escalationRequired) {
    responseStrategy = "crisis"
  } else if (safetyResult.riskLevel === "high") {
    responseStrategy = "referral"
  } else if (symptoms.length > 0 || sentiment.score < 0.4) {
    responseStrategy = "coping"
  }

  return {
    riskLevel: safetyResult.riskLevel,
    symptoms,
    sentiment,
    emotions,
    safetyFlags: safetyResult.safetyFlags,
    escalationRequired: safetyResult.escalationRequired,
    responseStrategy,
  }
}
