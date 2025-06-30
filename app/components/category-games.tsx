"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Play,
  Clock,
  Star,
  Trophy,
  Target,
  Zap,
  Brain,
  Eye,
  Layers,
  Users,
  TrendingUp,
  Award,
} from "lucide-react"

interface CategoryGamesProps {
  category: any
  onGameSelect: (game: any) => void
  onBack: () => void
  cognitiveScores: Record<string, number>
}

// Game definitions for each category
const categoryGames = {
  "working-memory": [
    {
      id: "n-back-spatial",
      name: "N-Back Challenge",
      description: "Remember positions in a sequence",
      difficulty: "Medium",
      duration: "5-8 min",
      type: "Spatial Memory",
      icon: Brain,
      color: "bg-blue-500",
      popularity: 95,
      avgScore: 78,
      features: ["Adaptive difficulty", "Spatial tracking", "Performance analytics"],
    },
    {
      id: "dual-n-back",
      name: "Dual N-Back",
      description: "Track both visual and audio sequences",
      difficulty: "Hard",
      duration: "8-12 min",
      type: "Dual Task",
      icon: Layers,
      color: "bg-indigo-600",
      popularity: 87,
      avgScore: 65,
      features: ["Dual modality", "Advanced training", "Research-backed"],
    },
    {
      id: "memory-matrix",
      name: "Memory Matrix",
      description: "Remember patterns in a grid",
      difficulty: "Easy",
      duration: "3-5 min",
      type: "Pattern Memory",
      icon: Target,
      color: "bg-blue-400",
      popularity: 92,
      avgScore: 82,
      features: ["Visual patterns", "Progressive difficulty", "Quick sessions"],
    },
    {
      id: "sequence-recall",
      name: "Sequence Recall",
      description: "Memorize and repeat number sequences",
      difficulty: "Medium",
      duration: "4-6 min",
      type: "Verbal Memory",
      icon: Brain,
      color: "bg-purple-500",
      popularity: 89,
      avgScore: 75,
      features: ["Number sequences", "Verbal processing", "Memory span"],
    },
    {
      id: "working-memory-span",
      name: "Memory Span Test",
      description: "Test your memory capacity limits",
      difficulty: "Medium",
      duration: "6-10 min",
      type: "Capacity Test",
      icon: TrendingUp,
      color: "bg-green-500",
      popularity: 84,
      avgScore: 71,
      features: ["Capacity testing", "Span measurement", "Benchmark scoring"],
    },
    {
      id: "updating-task",
      name: "Mental Updating",
      description: "Keep track of changing information",
      difficulty: "Hard",
      duration: "7-10 min",
      type: "Dynamic Memory",
      icon: Zap,
      color: "bg-orange-500",
      popularity: 79,
      avgScore: 68,
      features: ["Dynamic updates", "Mental flexibility", "Real-time tracking"],
    },
  ],
  "processing-speed": [
    {
      id: "color-word-stroop",
      name: "Color Rush",
      description: "Match colors and words quickly",
      difficulty: "Easy",
      duration: "3-5 min",
      type: "Stroop Task",
      icon: Zap,
      color: "bg-yellow-500",
      popularity: 96,
      avgScore: 85,
      features: ["Color matching", "Speed training", "Interference control"],
    },
    {
      id: "symbol-search",
      name: "Symbol Hunter",
      description: "Find matching symbols rapidly",
      difficulty: "Easy",
      duration: "4-6 min",
      type: "Visual Search",
      icon: Eye,
      color: "bg-amber-500",
      popularity: 91,
      avgScore: 80,
      features: ["Visual scanning", "Pattern recognition", "Speed focus"],
    },
    {
      id: "rapid-naming",
      name: "Speed Naming",
      description: "Name objects as fast as possible",
      difficulty: "Medium",
      duration: "3-4 min",
      type: "Verbal Speed",
      icon: Brain,
      color: "bg-orange-600",
      popularity: 88,
      avgScore: 77,
      features: ["Verbal fluency", "Rapid naming", "Language speed"],
    },
    {
      id: "choice-reaction",
      name: "Quick Decisions",
      description: "Make rapid choices between options",
      difficulty: "Medium",
      duration: "5-7 min",
      type: "Reaction Time",
      icon: Target,
      color: "bg-red-500",
      popularity: 93,
      avgScore: 83,
      features: ["Decision speed", "Choice reaction", "Response time"],
    },
    {
      id: "processing-speed-test",
      name: "Speed Test",
      description: "Complete simple tasks as quickly as possible",
      difficulty: "Easy",
      duration: "2-3 min",
      type: "Speed Assessment",
      icon: TrendingUp,
      color: "bg-green-600",
      popularity: 87,
      avgScore: 88,
      features: ["Speed assessment", "Simple tasks", "Performance tracking"],
    },
  ],
  "attention-focus": [
    {
      id: "sustained-attention",
      name: "Focus Master",
      description: "Maintain attention over extended periods",
      difficulty: "Medium",
      duration: "8-12 min",
      type: "Sustained Attention",
      icon: Target,
      color: "bg-green-500",
      popularity: 89,
      avgScore: 76,
      features: ["Long duration", "Vigilance training", "Concentration"],
    },
    {
      id: "selective-attention",
      name: "Attention Filter",
      description: "Focus on relevant while ignoring distractions",
      difficulty: "Medium",
      duration: "6-8 min",
      type: "Selective Attention",
      icon: Eye,
      color: "bg-teal-500",
      popularity: 92,
      avgScore: 79,
      features: ["Distraction filtering", "Selective focus", "Attention control"],
    },
    {
      id: "divided-attention",
      name: "Multi-Task Master",
      description: "Handle multiple tasks simultaneously",
      difficulty: "Hard",
      duration: "7-10 min",
      type: "Divided Attention",
      icon: Layers,
      color: "bg-purple-600",
      popularity: 85,
      avgScore: 72,
      features: ["Multi-tasking", "Attention splitting", "Cognitive load"],
    },
    {
      id: "attention-network",
      name: "Network Test",
      description: "Test different attention networks",
      difficulty: "Medium",
      duration: "10-15 min",
      type: "Network Assessment",
      icon: Brain,
      color: "bg-indigo-500",
      popularity: 81,
      avgScore: 74,
      features: ["Network testing", "Comprehensive assessment", "Research-based"],
    },
    {
      id: "flanker-task",
      name: "Flanker Challenge",
      description: "Ignore irrelevant flanking stimuli",
      difficulty: "Medium",
      duration: "5-7 min",
      type: "Conflict Resolution",
      icon: Target,
      color: "bg-blue-600",
      popularity: 88,
      avgScore: 77,
      features: ["Conflict resolution", "Inhibitory control", "Attention focus"],
    },
    {
      id: "attention-blink",
      name: "Blink Detection",
      description: "Detect targets in rapid sequences",
      difficulty: "Hard",
      duration: "6-9 min",
      type: "Temporal Attention",
      icon: Zap,
      color: "bg-red-600",
      popularity: 76,
      avgScore: 69,
      features: ["Temporal processing", "Rapid detection", "Attention blink"],
    },
    {
      id: "mindfulness-attention",
      name: "Mindful Focus",
      description: "Practice mindful attention training",
      difficulty: "Easy",
      duration: "5-10 min",
      type: "Mindfulness",
      icon: Brain,
      color: "bg-green-400",
      popularity: 94,
      avgScore: 86,
      features: ["Mindfulness", "Relaxed attention", "Stress reduction"],
    },
  ],
  // Add more categories as needed...
}

export default function CategoryGames({ category, onGameSelect, onBack, cognitiveScores }: CategoryGamesProps) {
  const games = categoryGames[category.id] || []
  const currentScore = cognitiveScores[category.scoreKey] || 0
  const IconComponent = category.icon

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

  const getPopularityStars = (popularity: number) => {
    const stars = Math.round(popularity / 20)
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-3 w-3 ${i < stars ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
            <IconComponent className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{category.name}</h2>
            <p className="text-sm text-muted-foreground">{games.length} games available</p>
          </div>
        </div>
      </div>

      {/* Category Overview */}
      <Card className={`bg-gradient-to-r ${category.gradient} text-white`}>
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{currentScore}%</div>
              <div className="text-sm text-white/80">Your Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{games.length}</div>
              <div className="text-sm text-white/80">Games</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{category.totalTime}</div>
              <div className="text-sm text-white/80">Total Time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Game */}
      {games.length > 0 && (
        <Card className="border-2 border-blue-200 bg-blue-50 dark:bg-blue-900/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5 text-blue-600" />
              Recommended Game
            </CardTitle>
            <CardDescription>Best game to start with for this category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${games[0].color} rounded-lg flex items-center justify-center`}>
                {games[0].icon && React.createElement(games[0].icon, { className: "h-6 w-6 text-white" })}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{games[0].name}</div>
                <div className="text-sm text-muted-foreground">{games[0].description}</div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className={getDifficultyColor(games[0].difficulty)}>
                    {games[0].difficulty}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{games[0].duration}</span>
                </div>
              </div>
              <Button onClick={() => onGameSelect(games[0])}>
                <Play className="h-4 w-4 mr-2" />
                Play
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Games List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">All Games</h3>
        {games.map((game, index) => {
          const GameIcon = game.icon
          return (
            <Card key={game.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Game Icon */}
                  <div className={`w-14 h-14 ${game.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    {GameIcon && <GameIcon className="h-7 w-7 text-white" />}
                  </div>

                  {/* Game Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-lg">{game.name}</h4>
                        <p className="text-sm text-muted-foreground mb-1">{game.description}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {game.type}
                          </Badge>
                          <Badge variant="secondary" className={getDifficultyColor(game.difficulty)}>
                            {game.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <Button onClick={() => onGameSelect(game)}>
                        <Play className="h-4 w-4 mr-2" />
                        Play
                      </Button>
                    </div>

                    {/* Game Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>{game.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span>{game.popularity}% play rate</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="h-3 w-3 text-muted-foreground" />
                        <span>{game.avgScore}% avg score</span>
                      </div>
                    </div>

                    {/* Popularity Stars */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">{getPopularityStars(game.popularity)}</div>
                      <span className="text-xs text-muted-foreground">({game.popularity}% popularity)</span>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1">
                      {game.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="outline" className="text-xs px-2 py-0">
                          {feature}
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

      {/* Category Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-4 w-4" />
            Training Benefits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {category.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Progress in {category.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Overall Score</span>
              <span className="font-medium">{currentScore}%</span>
            </div>
            <Progress value={currentScore} className="h-2" />
            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                Games Completed: {Math.floor(games.length * 0.6)}/{games.length}
              </div>
              <div>Best Score: {Math.min(currentScore + 15, 100)}%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
