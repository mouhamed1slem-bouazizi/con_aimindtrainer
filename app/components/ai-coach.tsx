"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, Target, Lightbulb, MessageCircle, Calendar } from "lucide-react"

interface AICoachProps {
  userStats: any
  cognitiveScores: Record<string, number>
}

export default function AICoach({ userStats, cognitiveScores }: AICoachProps) {
  // AI-generated insights based on user data
  const getPersonalizedInsights = () => {
    const weakestDomain = Object.entries(cognitiveScores).reduce(
      (min, [key, value]) => (value < min.value ? { key, value } : min),
      { key: "", value: 100 },
    )

    const strongestDomain = Object.entries(cognitiveScores).reduce(
      (max, [key, value]) => (value > max.value ? { key, value } : max),
      { key: "", value: 0 },
    )

    return {
      weakestDomain,
      strongestDomain,
      averageScore: Math.round(
        Object.values(cognitiveScores).reduce((a, b) => a + b, 0) / Object.values(cognitiveScores).length,
      ),
      streak: userStats.currentStreak,
    }
  }

  const insights = getPersonalizedInsights()

  const domainNames = {
    workingMemory: "Working Memory",
    processingSpeed: "Processing Speed",
    attention: "Attention & Focus",
    flexibility: "Cognitive Flexibility",
    problemSolving: "Problem Solving",
    visualProcessing: "Visual Processing",
    executiveFunction: "Executive Function",
    verbalFluency: "Verbal Fluency",
    numericalReasoning: "Numerical Reasoning",
    memoryConsolidation: "Memory Consolidation",
  }

  const recommendations = [
    {
      title: "Focus on Working Memory",
      description: "Your working memory scores suggest room for improvement. Try the N-Back Challenge daily.",
      priority: "High",
      icon: Brain,
      action: "Start N-Back",
    },
    {
      title: "Maintain Your Streak",
      description: `Great job on your ${insights.streak}-day streak! Keep it going with short 5-minute sessions.`,
      priority: "Medium",
      icon: Target,
      action: "Quick Session",
    },
    {
      title: "Balanced Training",
      description: "Consider rotating between different cognitive domains for well-rounded development.",
      priority: "Low",
      icon: TrendingUp,
      action: "View Schedule",
    },
  ]

  const weeklyPlan = [
    { day: "Monday", focus: "Working Memory", games: ["N-Back Challenge"], duration: "10 min" },
    { day: "Tuesday", focus: "Processing Speed", games: ["Color Rush"], duration: "8 min" },
    { day: "Wednesday", focus: "Attention", games: ["Focus Master"], duration: "12 min" },
    { day: "Thursday", focus: "Problem Solving", games: ["Logic Puzzles"], duration: "15 min" },
    { day: "Friday", focus: "Mixed Training", games: ["Quick Session"], duration: "10 min" },
    { day: "Weekend", focus: "Review & Rest", games: ["Optional"], duration: "5 min" },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">AI Coach</h2>
        <p className="text-muted-foreground">Personalized insights and recommendations</p>
      </div>

      {/* AI Insights Summary */}
      <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Your Cognitive Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-purple-100">Overall Score</div>
              <div className="text-2xl font-bold">{insights.averageScore}%</div>
            </div>
            <div>
              <div className="text-sm text-purple-100">Current Streak</div>
              <div className="text-2xl font-bold">{insights.streak} days</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white/10 rounded-lg">
            <div className="text-sm">
              <strong>Strongest:</strong> {domainNames[insights.strongestDomain.key]} ({insights.strongestDomain.value}
              %)
            </div>
            <div className="text-sm mt-1">
              <strong>Focus Area:</strong> {domainNames[insights.weakestDomain.key]} ({insights.weakestDomain.value}%)
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personalized Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Recommendations for You
          </CardTitle>
          <CardDescription>AI-powered suggestions based on your performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, index) => {
              const IconComponent = rec.icon
              return (
                <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{rec.title}</h3>
                      <Badge className={getPriorityColor(rec.priority)}>{rec.priority}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                    <Button size="sm" variant="outline">
                      {rec.action}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Training Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Your Weekly Plan
          </CardTitle>
          <CardDescription>Optimized training schedule for maximum improvement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weeklyPlan.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{day.day}</div>
                  <div className="text-sm text-muted-foreground">
                    {day.focus} • {day.duration}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{day.games.join(", ")}</div>
                  <Badge variant="outline" className="text-xs">
                    {day.duration}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Motivational Message */}
      <Card className="border-2 border-dashed border-green-300 bg-green-50 dark:bg-green-900/10">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <MessageCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-600">Daily Motivation</h3>
              <p className="text-sm text-green-700 dark:text-green-500 mt-1">
                "Your brain is like a muscle - the more you train it, the stronger it gets! You've already completed{" "}
                {userStats.totalSessions} sessions. Keep up the amazing work!"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Performance Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div>
                <div className="font-medium">Reaction Time</div>
                <div className="text-sm text-muted-foreground">Average response speed</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-600">-12ms</div>
                <div className="text-xs text-green-600">↓ Improving</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div>
                <div className="font-medium">Accuracy Rate</div>
                <div className="text-sm text-muted-foreground">Overall correctness</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">+5%</div>
                <div className="text-xs text-green-600">↑ Improving</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
