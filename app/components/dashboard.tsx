"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, Award, Zap, Brain, Play } from "lucide-react"

interface DashboardProps {
  userStats: {
    totalSessions: number
    currentStreak: number
    totalXP: number
    cognitiveScore: number
    weeklyGoal: number
    completedThisWeek: number
  }
  cognitiveScores: Record<string, number>
  onStartTraining: () => void
}

export default function Dashboard({ userStats, cognitiveScores, onStartTraining }: DashboardProps) {
  const weeklyProgress = (userStats.completedThisWeek / userStats.weeklyGoal) * 100
  const averageScore = Math.round(
    Object.values(cognitiveScores).reduce((a, b) => a + b, 0) / Object.values(cognitiveScores).length,
  )

  return (
    <div className="space-y-4">
      {/* Welcome Card */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Welcome back!
          </CardTitle>
          <CardDescription className="text-blue-100">Ready to train your mind today?</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onStartTraining} className="w-full bg-white text-blue-600 hover:bg-blue-50">
            <Play className="h-4 w-4 mr-2" />
            Start Training
          </Button>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Current Streak</span>
            </div>
            <div className="text-2xl font-bold">{userStats.currentStreak}</div>
            <div className="text-xs text-muted-foreground">days</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Cognitive Score</span>
            </div>
            <div className="text-2xl font-bold">{averageScore}</div>
            <div className="text-xs text-muted-foreground">average</div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Goal Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-4 w-4" />
            Weekly Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                {userStats.completedThisWeek} of {userStats.weeklyGoal} sessions
              </span>
              <span>{Math.round(weeklyProgress)}%</span>
            </div>
            <Progress value={weeklyProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Today's Recommendations */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Today's Focus
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div>
              <div className="font-medium">Working Memory</div>
              <div className="text-sm text-muted-foreground">N-Back Challenge</div>
            </div>
            <Badge variant="secondary">Recommended</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div>
              <div className="font-medium">Processing Speed</div>
              <div className="text-sm text-muted-foreground">Color Match</div>
            </div>
            <Badge variant="outline">5 min</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-4 w-4" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">🏆</div>
              <div>
                <div className="font-medium text-sm">Week Warrior</div>
                <div className="text-xs text-muted-foreground">Completed 7 days in a row</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">🧠</div>
              <div>
                <div className="font-medium text-sm">Memory Master</div>
                <div className="text-xs text-muted-foreground">Scored 90%+ in memory games</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
