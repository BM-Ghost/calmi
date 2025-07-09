# 🧠 Calmi NeuroSymbolic Mental Health Assistant

A cutting-edge mental health chatbot that demonstrates the power of **neuro-symbolic AI** by combining rule-based safety systems with machine learning-powered empathy and understanding.

## 🎯 Project Overview

This project showcases a **neuro-symbolic model** that merges:
- **Symbolic AI**: Rule-based safety guardrails, pattern matching, and logical reasoning
- **Neural AI**: Machine learning for sentiment analysis, emotion detection, and natural language understanding
- **Hybrid Decision Making**: Intelligent fusion of both approaches for optimal mental health support

## 🏗️ Architecture

### Neuro-Symbolic Components

#### 🔧 Symbolic Components (Rule-Based)
- **Crisis Detection**: Hard-coded patterns for suicide ideation and self-harm
- **Safety Guardrails**: Immediate escalation protocols that never fail
- **Symptom Extraction**: Pattern matching for anxiety, depression, stress, etc.
- **Risk Assessment**: Logical rules for determining threat levels
- **Escalation Logic**: Structured decision trees for appropriate responses

#### 🤖 Neural Components (ML-Based)
- **Sentiment Analysis**: AI-powered emotion understanding using GPT-4o
- **Context Awareness**: Deep comprehension of conversational nuance
- **Empathetic Responses**: Human-like emotional intelligence
- **Natural Language Processing**: Advanced text understanding and generation

#### 🔗 Hybrid Decision Making
The system combines both approaches:
1. **Symbolic safety screening** (immediate, rule-based)
2. **Neural sentiment analysis** (contextual, ML-based)
3. **Hybrid response generation** (combines safety rules with empathetic AI)

## 🛡️ Safety-First Design

### Why Neuro-Symbolic for Mental Health?

- **Reliability**: Rule-based systems provide unbreakable safety guarantees
- **Empathy**: ML systems understand nuanced human emotions
- **Explainability**: Every safety decision is transparent and auditable
- **Robustness**: Hybrid systems are more reliable than pure ML approaches
- **Real-time**: Symbolic components work instantly without API calls

### Safety Features

- **Zero False Negatives**: Crisis detection never misses critical situations
- **Immediate Escalation**: Automatic referral to professional help when needed
- **Transparent Decisions**: All safety assessments are explainable
- **Fallback Systems**: Works even when AI components fail

## 🚀 Features

### Core Functionality
- **Real-time Chat Interface** with mental health focus
- **Crisis Prevention** through proactive risk assessment
- **Symptom Detection** using pattern matching and NLP
- **Empathetic Responses** that adapt to emotional context
- **Professional Referrals** when appropriate

### Technical Features
- **Neuro-Symbolic Engine**: Hybrid AI processing pipeline
- **Safety Monitoring**: Real-time risk assessment dashboard
- **Analytics Dashboard**: System performance metrics
- **Architecture Visualization**: Educational component breakdown
- **Fallback Systems**: Graceful degradation when AI fails

## 🔬 Technical Implementation

### Technology Stack
- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **AI Integration**: Groq.ai
- **Models**: GPT-4o, GPT-4.1, o3-mini
- **UI Components**: shadcn/ui, Radix UI
- **Charts**: Recharts for analytics visualization

### Core Algorithm

\`\`\`typescript
export async function analyzeMessage(message: string): Promise<MessageAnalysis> {
  // Step 1: Symbolic safety screening (highest priority)
  const safetyResult = performSafetyScreening(message)
  
  // Step 2: Symbolic symptom extraction
  const symptoms = extractSymptoms(message)
  
  // Step 3: Neural sentiment analysis
  const sentiment = await analyzeSentimentWithPuter(message)
  
  // Step 4: Neural emotion detection
  const emotions = await detectEmotionsWithPuter(message)
  
  // Step 5: Hybrid decision making
  return combineSymbolicAndNeuralInsights(safetyResult, symptoms, sentiment, emotions)
}
\`\`\`

### Interacting with the Assistant
The chatbot is designed as a mental health therapist that:
- Focuses primarily on emotional wellbeing
- Redirects general questions back to mental health topics
- Provides crisis intervention when needed
- Offers empathetic, professional support

### Example Interactions

**General Question Redirect:**
\`\`\`
User: "Where is Kenya?"
Dr. AI: "Kenya is a beautiful country in East Africa... I'm curious though - are you perhaps thinking about travel as a way to cope with stress? How are you feeling emotionally today?"
\`\`\`

**Mental Health Support:**
\`\`\`
User: "I'm feeling really anxious lately"
Dr. AI: "I notice you're experiencing anxiety, and I want you to know that these feelings are valid... Can you help me understand what might be contributing to these feelings?"
\`\`\`

**Crisis Intervention:**
\`\`\`
User: "I want to end it all"
Dr. AI: "I'm very concerned about what you've shared. Please reach out to a mental health professional immediately. Would you like me to help you find emergency resources?"
\`\`\`

## 📊 System Monitoring

### Real-time Analysis Panel
- **Risk Assessment**: Low/Medium/High risk classification
- **Symptom Detection**: Identified mental health indicators
- **Sentiment Analysis**: Emotional tone understanding
- **Safety Flags**: Crisis keywords and patterns detected
- **Response Strategy**: Chosen intervention approach

### Analytics Dashboard
- **Conversation Metrics**: Total interactions and trends
- **Safety Interventions**: Crisis prevention statistics
- **Symptom Detection**: Accuracy and frequency data
- **System Performance**: Response times and reliability

## 🔬 Research Applications

This project demonstrates several important AI concepts:

### Neuro-Symbolic AI
- **Symbol Grounding**: Connecting symbolic rules to neural understanding
- **Hybrid Reasoning**: Combining logical and statistical approaches
- **Explainable AI**: Transparent decision-making processes
- **Safety-Critical AI**: Reliable systems for sensitive applications

### Mental Health Technology
- **Digital Therapeutics**: AI-assisted mental health support
- **Crisis Prevention**: Automated risk assessment and intervention
- **Personalized Care**: Adaptive responses based on individual needs
- **Ethical AI**: Responsible deployment in healthcare contexts

## 🚨 Important Disclaimers

- This is a **demonstration of AI technology** for educational purposes
- **Not a substitute** for professional mental health care
- **Crisis situations** require immediate professional intervention
- **Always consult** qualified healthcare providers for serious concerns

## 🤝 Contributing

This project is designed for solution and research purposes. Contributions that enhance the neuro-symbolic architecture, improve safety features, or add resourceful content are welcome.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments
- **Groq.ai** for advanced language models
- **Mental health professionals** who inspire ethical AI development

---

**Built with ❤️ for mental health awareness and AI safety research**
