"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, TrendingUp, Target, Calendar, Award, Lightbulb, ChevronRight, Clock, Zap } from "lucide-react"
import NeuroscienceCorner from "./neuroscience-corner"

export default function AICoach() {
  const [selectedInsight, setSelectedInsight] = useState(0)

  const insights = [
    {
      title: "Focus on Working Memory",
      description:
        "Your working memory scores show the most potential for improvement. Consistent training in this area could boost your overall cognitive performance by 15-20%.",
      recommendation: "Try the N-Back Challenge and Memory Matrix games daily for 2 weeks.",
      priority: "High",
      color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    },
    {
      title: "Excellent Processing Speed",
      description:
        "Your reaction times are in the top 25% for your age group. Maintain this strength while building other cognitive areas.",
      recommendation: "Continue with speed-based games 2-3 times per week to maintain your edge.",
      priority: "Medium",
      color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    },
    {
      title: "Attention Training Needed",
      description:
        "Your attention scores suggest difficulty with sustained focus. This is common and highly trainable with the right exercises.",
      recommendation: "Start with 5-minute attention games and gradually increase duration.",
      priority: "High",
      color: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
    },
  ]

  const weeklyPlan = [
    { day: "Monday", focus: "Working Memory", games: ["N-Back Challenge", "Memory Matrix"], duration: "15 min" },
    { day: "Tuesday", focus: "Processing Speed", games: ["Color Rush", "Symbol Hunter"], duration: "12 min" },
    { day: "Wednesday", focus: "Attention", games: ["Focus Master", "Attention Filter"], duration: "18 min" },
    { day: "Thursday", focus: "Working Memory", games: ["Sequence Recall", "Mental Updating"], duration: "15 min" },
    { day: "Friday", focus: "Mixed Training", games: ["Daily Challenge"], duration: "20 min" },
    { day: "Saturday", focus: "Problem Solving", games: ["Logic Puzzles", "Pattern Recognition"], duration: "16 min" },
    { day: "Sunday", focus: "Rest Day", games: ["Light Review"], duration: "5 min" },
  ]

  const achievements = [
    { name: "Memory Master", description: "Complete 50 memory games", progress: 76, total: 50 },
    { name: "Speed Demon", description: "Achieve sub-500ms reaction time", progress: 85, total: 100 },
    { name: "Consistency King", description: "Train for 30 consecutive days", progress: 23, total: 30 },
    { name: "Cognitive Athlete", description: "Reach level 10 in all domains", progress: 60, total: 100 },
  ]

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">AI Coach</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Personalized insights and recommendations for your cognitive training
        </p>
      </div>

      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="plan">Weekly Plan</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="neuroscience">Science</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                Personalized Insights
              </CardTitle>
              <CardDescription>AI-powered analysis of your cognitive performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedInsight === index
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 hover:border-blue-300 dark:border-gray-700"
                    }`}
                    onClick={() => setSelectedInsight(index)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{insight.title}</h3>
                          <Badge className={insight.color}>{insight.priority}</Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{insight.description}</p>
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                          <Lightbulb className="h-4 w-4" />
                          <span className="text-sm font-medium">{insight.recommendation}</span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-gray-100">+12%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Weekly Goal</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-gray-100">85%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <Zap className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Streak</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-gray-100">23 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="plan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Your Weekly Training Plan
              </CardTitle>
              <CardDescription>AI-optimized schedule based on your performance and goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weeklyPlan.map((day, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-semibold">
                        {day.day.slice(0, 3)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{day.focus}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{day.games.join(", ")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{day.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-600" />
                Achievement Progress
              </CardTitle>
              <CardDescription>Track your milestones and unlock new badges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{achievement.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {achievement.progress}%
                      </span>
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="neuroscience" className="space-y-4">
          <NeuroscienceCorner />
        </TabsContent>
      </Tabs>
    </div>
  )
}
