import { type NextRequest, NextResponse } from "next/server"

// Mock content for demonstration - replace with OpenAI integration when API key is available
const mockContent = {
  "Memory & Brain": `Your brain is remarkably adaptable through neuroplasticity - the ability to reorganize and form new neural connections throughout life. When you engage in cognitive training, you're literally rewiring your brain for better performance.

Each time you complete a memory exercise, you strengthen synaptic connections between neurons. These connections become more efficient with practice, like well-traveled pathways in a forest. The hippocampus, your brain's memory center, grows new neurons through neurogenesis when challenged with novel tasks.

Regular brain training increases the production of brain-derived neurotrophic factor (BDNF), a protein that promotes neuron growth and protects existing brain cells. This biological enhancement translates to improved working memory, faster information processing, and better cognitive flexibility.

The key is consistency - just 15 minutes of daily cognitive training can create measurable changes in brain structure within weeks. Your dedication to mental fitness is literally sculpting a sharper, more resilient mind.`,

  "Reaction Time": `Your reaction time reflects the speed of neural communication throughout your brain and nervous system. When you train cognitively, you're optimizing this biological network for peak performance.

Faster reactions result from improved myelination - the process where fatty sheaths wrap around nerve fibers, increasing signal transmission speed by up to 100 times. Cognitive training stimulates oligodendrocytes, cells that produce myelin, creating more efficient neural highways.

The prefrontal cortex, responsible for decision-making, becomes more efficient through training. Neural pathways become streamlined, reducing the time between stimulus recognition and motor response. This process, called neural efficiency, means your brain uses less energy while processing information faster.

Regular cognitive challenges also enhance the corpus callosum, the bridge between brain hemispheres, improving coordination between different brain regions. As you continue training, you're building a high-performance neural network that responds with lightning speed to cognitive demands.`,
}

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json()

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 })
    }

    // For now, return mock content. Replace with OpenAI integration when API key is configured
    const content = mockContent[topic as keyof typeof mockContent] || mockContent["Memory & Brain"]

    // Simulate API delay for realistic experience
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return NextResponse.json({ content })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
  }
}
