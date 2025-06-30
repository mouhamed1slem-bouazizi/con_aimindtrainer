import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json()

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 })
    }

    // Mock content for demonstration (replace with OpenAI when API key is available)
    const mockContent = {
      "memory-brain": `Neuroplasticity is your brain's remarkable ability to reorganize and form new neural connections throughout life. When you engage in cognitive training, you're literally reshaping your brain's architecture. Each time you challenge your working memory, neurons fire together and strengthen their synaptic connections - following the principle "neurons that fire together, wire together."

Brain training exercises stimulate the production of BDNF (Brain-Derived Neurotrophic Factor), often called "Miracle-Gro for the brain." This protein promotes the growth of new neurons and protects existing ones. Regular cognitive challenges increase gray matter density in areas responsible for memory, attention, and executive function.

The hippocampus, your brain's memory center, shows remarkable growth with consistent training. Studies reveal that just 8 weeks of cognitive exercises can increase hippocampal volume by 2-3%. Your brain is constantly adapting - every challenge you complete is building a stronger, more efficient neural network. Keep training, and watch your cognitive abilities soar!`,

      "reaction-time": `Your reaction time is a direct reflection of your brain's processing efficiency. When you train cognitively, you're enhancing the speed at which electrical signals travel through your neural networks. This improvement occurs through myelination - the process where fatty sheaths wrap around nerve fibers, acting like insulation on electrical wires.

Regular brain training increases myelin thickness by up to 20%, dramatically accelerating signal transmission. Your corpus callosum, the bridge connecting brain hemispheres, becomes more efficient at coordinating information between left and right brain regions. This enhanced connectivity reduces the time needed to process and respond to stimuli.

Cognitive training also optimizes your brain's "neural highways" - frequently used pathways become more efficient through repeated activation. Your prefrontal cortex, responsible for decision-making, develops faster processing algorithms. The result? Lightning-fast reactions that give you an edge in sports, driving, and daily activities. Every training session is literally rewiring your brain for speed!`,
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const content = mockContent[topic as keyof typeof mockContent]

    if (!content) {
      return NextResponse.json({ error: "Invalid topic" }, { status: 400 })
    }

    return NextResponse.json({ content })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
  }
}
