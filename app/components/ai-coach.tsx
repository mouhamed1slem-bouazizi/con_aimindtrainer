"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, Target, Calendar, Award, Lightbulb } from "lucide-react"
import NeuroscienceCorner from "./neuroscience-corner"

export default function AICoach() {
  const [selectedInsight, setSelectedInsight] = useState(0)

  const insights = [
    {
      title: "Focus on Working Memory",
      description:
        "Your working memory scores show the most potential for improvement. Try the N-Back Challenge daily.",
      priority: "high",
      icon: Brain,
    },
    {
      title: "Consistency is Key",
      description: "You've trained 4 days this week! Maintaining daily practice will accelerate your progress.",
      priority: "medium",
      icon: Calendar,
    },
    {
      title: "Speed vs Accuracy",
      description: "Your reaction time is improving, but focus on accuracy first. Speed will follow naturally.",
      priority: "low",
      icon: Target,
    },
  ]

  const weeklyPlan = [
    { day: "Monday", focus: "Working Memory", games: ["N-Back Challenge", "Memory Matrix"], completed: true },
    { day: "Tuesday", focus: "Processing Speed", games: ["Color Rush", "Symbol Hunter"], completed: true },
    { day: "Wednesday", focus: "Attention", games: ["Focus Master", "Attention Filter"], completed: true },
    { day: "Thursday", focus: "Problem Solving", games: ["Logic Puzzles", "Pattern Recognition"], completed: true },
    { day: "Friday", focus: "Mixed Training", games: ["Daily Challenge", "Quick Session"], completed: false },
    { day: "Saturday", focus: "Cognitive Flexibility", games: ["Task Switcher", "Mental Agility"], completed: false },
    { day: "Sunday", focus: "Review & Rest", games: ["Light Training", "Progress Review"], completed: false },
  ]

  const achievements = [
    { name: "Memory Master", description: "Complete 50 memory games", progress: 76, total: 50 },
    { name: "Speed Demon", description: "Achieve sub-500ms reaction time", progress: 45, total: 100 },
    { name: "Consistency Champion", description: "Train for 30 consecutive days", progress: 12, total: 30 },
    { name: "Perfect Score", description: "Get 100% accuracy in any game", progress: 0, total: 1 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">🤖 AI Coach</h1>
          <p className="text-muted-foreground">Your personal cognitive fitness trainer powered by AI</p>
        </div>

        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="plan">Weekly Plan</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="neuroscience">Neuroscience</TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Personalized Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.map((insight, index) => {
                  const IconComponent = insight.icon
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedInsight === index
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedInsight(index)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            insight.priority === "high"
                              ? "bg-red-100 text-red-600"
                              : insight.priority === "medium"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-green-100 text-green-600"
                          }`}
                        >
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{insight.title}</h3>
                            <Badge
                              variant={
                                insight.priority === "high"
                                  ? "destructive"
                                  : insight.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {insight.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{insight.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">+12%</div>
                    <div className="text-sm text-muted-foreground">This Week</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">847</div>
                    <div className="text-sm text-muted-foreground">Avg Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plan" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  AI-Optimized Weekly Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {weeklyPlan.map((day, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      day.completed ? "border-green-200 bg-green-50 dark:bg-green-950" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${day.completed ? "bg-green-500" : "bg-gray-300"}`} />
                        <h3 className="font-semibold">{day.day}</h3>
                        <Badge variant="outline">{day.focus}</Badge>
                      </div>
                      {day.completed && <Award className="h-4 w-4 text-green-600" />}
                    </div>
                    <div className="flex gap-2 ml-6">
                      {day.games.map((game, gameIndex) => (
                        <Badge key={gameIndex} variant="secondary" className="text-xs">
                          {game}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievement Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{achievement.name}</h3>
                      <span className="text-sm text-muted-foreground">
                        {achievement.progress}/{achievement.total}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="neuroscience" className="space-y-6">
            <NeuroscienceCorner />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
