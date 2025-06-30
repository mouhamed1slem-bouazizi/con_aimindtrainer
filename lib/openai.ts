import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateNeuroscienceContent(topic: string): Promise<string> {
  try {
    const prompts = {
      "Memory & Brain": `Write a concise, engaging neuroscience explanation (150-200 words) about how brain training improves memory and cognitive function. Focus on neuroplasticity, synaptic connections, and how regular cognitive exercises strengthen neural pathways. Make it motivational and scientifically accurate for a general audience using a brain training app.`,

      "Reaction Time": `Write a concise, engaging neuroscience explanation (150-200 words) about how brain training improves reaction time and neural processing speed. Focus on myelination, neural efficiency, and how cognitive exercises enhance signal transmission between neurons. Make it motivational and scientifically accurate for a general audience using a brain training app.`,
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content:
            "You are a neuroscience expert writing educational content for a brain training app. Your explanations should be scientifically accurate, engaging, and motivational.",
        },
        {
          role: "user",
          content: prompts[topic as keyof typeof prompts] || prompts["Memory & Brain"],
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    })

    return response.choices[0]?.message?.content || "Content generation failed. Please try again."
  } catch (error) {
    console.error("OpenAI API Error:", error)
    return "Unable to generate content at this time. Please check your connection and try again."
  }
}
