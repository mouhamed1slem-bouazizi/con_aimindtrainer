import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateNeuroscienceContent(topic: string): Promise<string> {
  try {
    const prompts = {
      "memory-brain": `Write a 150-200 word scientific explanation about how brain training improves memory and cognitive function. Focus on neuroplasticity, synaptic connections, and BDNF (Brain-Derived Neurotrophic Factor). Make it motivational and educational for users doing cognitive training exercises. Use accessible language but include scientific terms.`,
      "reaction-time": `Write a 150-200 word scientific explanation about how brain training improves reaction time and neural processing speed. Focus on myelination, neural efficiency, and signal transmission. Explain how regular cognitive training leads to faster reactions. Make it motivational and educational. Use accessible language but include scientific terms.`,
    }

    const prompt = prompts[topic as keyof typeof prompts]
    if (!prompt) {
      throw new Error("Invalid topic")
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content:
            "You are a neuroscience expert writing educational content for a brain training app. Write in an engaging, motivational tone that encourages users to continue their cognitive training.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    })

    return completion.choices[0]?.message?.content || "Content generation failed"
  } catch (error) {
    console.error("OpenAI API Error:", error)
    throw new Error("Failed to generate content")
  }
}
