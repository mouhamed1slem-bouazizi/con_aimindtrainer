"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Zap,
  Eye,
  Puzzle,
  Clock,
  Calculator,
  MessageSquare,
  Target,
  Layers,
  BookOpen,
  ChevronRight,
  Trophy,
  Star,
} from "lucide-react"

interface TrainingCategoriesProps {
  onCategorySelect: (category: any) => void
  cognitiveScores: Record<string, number>
}

const cognitiveCategories = [
  {
    id: "working-memory",
    name: "Working Memory",
    description: "Train your ability to hold and manipulate information",
    icon: Brain,
    color: "bg-blue-500",
    gradient: "from-blue-500 to-blue-600",
    scoreKey: "workingMemory",
    gameCount: 6,
    totalTime: "25-40 min",
    difficulty: "Medium",
    benefits: ["Better focus", "Enhanced learning", "Improved reasoning"],
  },
  {
    id: "processing-speed",
    name: "Processing Speed",
    description: "Improve your mental processing and reaction time",
    icon: Zap,
    color: "bg-yellow-500",
    gradient: "from-yellow-500 to-orange-500",
    scoreKey: "processingSpeed",
    gameCount: 5,
    totalTime: "15-25 min",
    difficulty: "Easy",
    benefits: ["Faster thinking", "Quick decisions", "Better reflexes"],
  },
  {
    id: "attention-focus",
    name: "Attention & Focus",
    description: "Enhance sustained and selective attention abilities",
    icon: Target,
    color: "bg-green-500",
    gradient: "from-green-500 to-emerald-500",
    scoreKey: "attention",
    gameCount: 7,
    totalTime: "30-45 min",
    difficulty: "Medium",
    benefits: ["Better concentration", "Reduced distractions", "Enhanced focus"],
  },
  {
    id: "cognitive-flexibility",
    name: "Cognitive Flexibility",
    description: "Develop mental agility and task-switching skills",
    icon: Layers,
    color: "bg-purple-500",
    gradient: "from-purple-500 to-violet-500",
    scoreKey: "flexibility",
    gameCount: 5,
    totalTime: "20-35 min",
    difficulty: "Hard",
    benefits: ["Adaptability", "Creative thinking", "Problem solving"],
  },
  {
    id: "problem-solving",
    name: "Problem Solving",
    description: "Strengthen logical reasoning and pattern recognition",
    icon: Puzzle,
    color: "bg-indigo-500",
    gradient: "from-indigo-500 to-blue-600",
    scoreKey: "problemSolving",
    gameCount: 8,
    totalTime: "35-50 min",
    difficulty: "Medium",
    benefits: ["Logical thinking", "Pattern recognition", "Strategic planning"],
  },
  {
    id: "visual-processing",
    name: "Visual Processing",
    description: "Improve spatial reasoning and visual perception",
    icon: Eye,
    color: "bg-teal-500",
    gradient: "from-teal-500 to-cyan-500",
    scoreKey: "visualProcessing",
    gameCount: 6,
    totalTime: "25-35 min",
    difficulty: "Medium",
    benefits: ["Spatial awareness", "Visual memory", "3D thinking"],
  },
  {
    id: "executive-function",
    name: "Executive Function",
    description: "Train planning, inhibition, and cognitive control",
    icon: Brain,
    color: "bg-red-500",
    gradient: "from-red-500 to-pink-500",
    scoreKey: "executiveFunction",
    gameCount: 7,
    totalTime: "40-60 min",
    difficulty: "Hard",
    benefits: ["Self-control", "Planning skills", "Decision making"],
  },
  {
    id: "verbal-fluency",
    name: "Verbal Fluency",
    description: "Enhance language skills and verbal reasoning",
    icon: MessageSquare,
    color: "bg-pink-500",
    gradient: "from-pink-500 to-rose-500",
    scoreKey: "verbalFluency",
    gameCount: 5,
    totalTime: "20-30 min",
    difficulty: "Easy",
    benefits: ["Better communication", "Vocabulary growth", "Language skills"],
  },
  {
    id: "numerical-reasoning",
    name: "Numerical Reasoning",
    description: "Develop mathematical thinking and number sense",
    icon: Calculator,
    color: "bg-orange-500",
    gradient: "from-orange-500 to-red-500",
    scoreKey: "numericalReasoning",
    gameCount: 6,
    totalTime: "25-40 min",
    difficulty: "Medium",
    benefits: ["Math skills", "Logical reasoning", "Number sense"],
  },
  {
    id: "memory-consolidation",
    name: "Memory Consolidation",
    description: "Strengthen long-term memory formation and recall",
    icon: BookOpen,
    color: "bg-cyan-500",
    gradient: "from-cyan-500 to-blue-500",
    scoreKey: "memoryConsolidation",
    gameCount: 6,
    totalTime: "30-45 min",
    difficulty: "Medium",
    benefits: ["Better recall", "Long-term memory", "Information retention"],
  },
]

export default function TrainingCategories({ onCategorySelect, cognitiveScores }: TrainingCategoriesProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRecommendedCategory = () => {
    // Find category with lowest score for recommendation
    let lowestScore = 100
    let recommendedCategory = null

    cognitiveCategories.forEach((category) => {
      const score = cognitiveScores[category.scoreKey] || 0
      if (score < lowestScore) {
        lowestScore = score
        recommendedCategory = category
      }
    })

    return recommendedCategory
  }

  const recommendedCategory = getRecommendedCategory()

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Training Categories</h2>
        <p className="text-muted-foreground">Choose a cognitive domain to explore games</p>
      </div>

      {/* Recommended Category */}
      {recommendedCategory && (
        <Card className={`bg-gradient-to-r ${recommendedCategory.gradient} text-white relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
          <CardHeader className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5" />
              <span className="text-sm font-medium">Recommended for You</span>
            </div>
            <CardTitle className="text-xl">{recommendedCategory.name}</CardTitle>
            <CardDescription className="text-white/80">Focus area based on your performance</CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-white/80 mb-1">Current Score</div>
                <div className="text-2xl font-bold">{cognitiveScores[recommendedCategory.scoreKey]}%</div>
              </div>
              <Button
                variant="secondary"
                onClick={() => onCategorySelect(recommendedCategory)}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Start Training
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Daily Challenge */}
      <Card className="border-2 border-dashed border-yellow-300 bg-yellow-50 dark:bg-yellow-900/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            Daily Challenge
          </CardTitle>
          <CardDescription>Complete today's mixed-domain challenge</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Cognitive Marathon</div>
              <div className="text-sm text-muted-foreground">3 games from different categories</div>
              <div className="text-xs text-yellow-600 mt-1">+500 XP Bonus • 15-20 min</div>
            </div>
            <Button variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-100 bg-transparent">
              Accept Challenge
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="space-y-3">
        {cognitiveCategories.map((category) => {
          const IconComponent = category.icon
          const currentScore = cognitiveScores[category.scoreKey] || 0

          return (
            <Card
              key={category.id}
              className="hover:shadow-md transition-all duration-200 cursor-pointer group"
              onClick={() => onCategorySelect(category)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform`}
                  >
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg truncate">{category.name}</h3>
                      <Badge variant="secondary" className={getDifficultyColor(category.difficulty)}>
                        {category.difficulty}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{category.description}</p>

                    {/* Stats Row */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Puzzle className="h-3 w-3" />
                          {category.gameCount} games
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {category.totalTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Score: {currentScore}%</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <Progress value={currentScore} className="h-2 mb-2" />

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-1">
                      {category.benefits.slice(0, 3).map((benefit, index) => (
                        <Badge key={index} variant="outline" className="text-xs px-2 py-0">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Training Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {cognitiveCategories.reduce((sum, cat) => sum + cat.gameCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Games Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(
                  Object.values(cognitiveScores).reduce((a, b) => a + b, 0) / Object.values(cognitiveScores).length,
                )}
                %
              </div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
