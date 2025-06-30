"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Calendar, Award } from "lucide-react"

interface ProgressTrackerProps {
  userStats: any
  cognitiveScores: Record<string, number>
}

export default function ProgressTracker({ userStats, cognitiveScores }: ProgressTrackerProps) {
  const cognitiveAreas = [
    { key: "workingMemory", name: "Working Memory", score: cognitiveScores.workingMemory },
    { key: "processingSpeed", name: "Processing Speed", score: cognitiveScores.processingSpeed },
    { key: "attention", name: "Attention & Focus", score: cognitiveScores.attention },
    { key: "flexibility", name: "Cognitive Flexibility", score: cognitiveScores.flexibility },
    { key: "problemSolving", name: "Problem Solving", score: cognitiveScores.problemSolving },
    { key: "visualProcessing", name: "Visual Processing", score: cognitiveScores.visualProcessing },
    { key: "executiveFunction", name: "Executive Function", score: cognitiveScores.executiveFunction },
    { key: "verbalFluency", name: "Verbal Fluency", score: cognitiveScores.verbalFluency },
    { key: "numericalReasoning", name: "Numerical Reasoning", score: cognitiveScores.numericalReasoning },
    { key: "memoryConsolidation", name: "Memory Consolidation", score: cognitiveScores.memoryConsolidation },
  ]

  const weeklyData = [
    { day: "Mon", sessions: 2, score: 75 },
    { day: "Tue", sessions: 1, score: 78 },
    { day: "Wed", sessions: 3, score: 82 },
    { day: "Thu", sessions: 1, score: 79 },
    { day: "Fri", sessions: 2, score: 85 },
    { day: "Sat", sessions: 1, score: 83 },
    { day: "Sun", sessions: 0, score: 0 },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { text: "Excellent", variant: "default" as const }
    if (score >= 80) return { text: "Good", variant: "secondary" as const }
    if (score >= 70) return { text: "Average", variant: "outline" as const }
    return { text: "Needs Work", variant: "destructive" as const }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Progress Tracker</h2>
        <p className="text-muted-foreground">Monitor your cognitive development</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="domains">Domains</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Overall Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Overall Score</span>
                </div>
                <div className="text-2xl font-bold">
                  {Math.round(
                    Object.values(cognitiveScores).reduce((a, b) => a + b, 0) / Object.values(cognitiveScores).length,
                  )}
                </div>
                <div className="text-xs text-green-600">+5% this week</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">This Week</span>
                </div>
                <div className="text-2xl font-bold">{userStats.completedThisWeek}</div>
                <div className="text-xs text-muted-foreground">of {userStats.weeklyGoal} sessions</div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Weekly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((day) => (
                  <div key={day.day} className="flex items-center gap-4">
                    <div className="w-8 text-sm font-medium">{day.day}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{day.sessions} sessions</span>
                        {day.score > 0 && (
                          <span className={`text-sm font-medium ${getScoreColor(day.score)}`}>{day.score}%</span>
                        )}
                      </div>
                      <Progress value={day.sessions * 33.33} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-4 w-4" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="text-2xl">🏆</div>
                  <div>
                    <div className="font-medium">Week Warrior</div>
                    <div className="text-sm text-muted-foreground">Completed 7 days in a row</div>
                  </div>
                  <Badge variant="secondary">New</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl">🧠</div>
                  <div>
                    <div className="font-medium">Memory Master</div>
                    <div className="text-sm text-muted-foreground">Scored 90%+ in memory games</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domains" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cognitive Domain Scores</CardTitle>
              <CardDescription>Your performance across all cognitive areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cognitiveAreas.map((area) => {
                  const badge = getScoreBadge(area.score)
                  return (
                    <div key={area.key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{area.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant={badge.variant}>{badge.text}</Badge>
                          <span className={`font-bold ${getScoreColor(area.score)}`}>{area.score}%</span>
                        </div>
                      </div>
                      <Progress value={area.score} className="h-2" />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Training History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "Today", game: "N-Back Challenge", score: 85, duration: "6 min" },
                  { date: "Yesterday", game: "Color Rush", score: 92, duration: "4 min" },
                  { date: "Yesterday", game: "Focus Master", score: 78, duration: "8 min" },
                  { date: "2 days ago", game: "Logic Puzzles", score: 81, duration: "10 min" },
                  { date: "2 days ago", game: "Spatial Navigator", score: 88, duration: "7 min" },
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{session.game}</div>
                      <div className="text-sm text-muted-foreground">
                        {session.date} • {session.duration}
                      </div>
                    </div>
                    <div className={`font-bold ${getScoreColor(session.score)}`}>{session.score}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
