"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Bell, Moon, Volume2, Target, Download, Share } from "lucide-react"

interface UserProfileProps {
  userStats: any
  onUpdateStats: (stats: any) => void
}

export default function UserProfile({ userStats, onUpdateStats }: UserProfileProps) {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [dailyGoal, setDailyGoal] = useState([20])

  const achievements = [
    { id: 1, name: "First Steps", description: "Complete your first training session", earned: true, icon: "🎯" },
    { id: 2, name: "Week Warrior", description: "Train for 7 consecutive days", earned: true, icon: "🏆" },
    { id: 3, name: "Memory Master", description: "Score 90%+ in memory games", earned: true, icon: "🧠" },
    { id: 4, name: "Speed Demon", description: "Complete 50 speed training sessions", earned: false, icon: "⚡" },
    { id: 5, name: "Perfectionist", description: "Achieve 100% accuracy in any game", earned: false, icon: "💯" },
    { id: 6, name: "Dedicated Trainer", description: "Complete 100 total sessions", earned: false, icon: "🎖️" },
    { id: 7, name: "Cognitive Champion", description: "Reach 90+ average score", earned: false, icon: "👑" },
    { id: 8, name: "Streak Master", description: "Maintain a 30-day streak", earned: false, icon: "🔥" },
  ]

  const earnedAchievements = achievements.filter((a) => a.earned)
  const availableAchievements = achievements.filter((a) => !a.earned)

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Profile</h2>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  U
                </div>
                <div>
                  <CardTitle>User</CardTitle>
                  <CardDescription>Cognitive Training Enthusiast</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{userStats.totalSessions}</div>
                  <div className="text-sm text-muted-foreground">Total Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{userStats.currentStreak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{userStats.totalXP}</div>
                  <div className="text-sm text-muted-foreground">Total XP</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{earnedAchievements.length}</div>
                  <div className="text-sm text-muted-foreground">Achievements</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">This Week</span>
                </div>
                <div className="text-lg font-bold">
                  {userStats.completedThisWeek}/{userStats.weeklyGoal}
                </div>
                <div className="text-xs text-muted-foreground">sessions completed</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Level</span>
                </div>
                <div className="text-lg font-bold">{Math.floor(userStats.totalXP / 1000) + 1}</div>
                <div className="text-xs text-muted-foreground">{userStats.totalXP % 1000}/1000 XP</div>
              </CardContent>
            </Card>
          </div>

          {/* Data Export */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data & Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export Training Data
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Share className="h-4 w-4 mr-2" />
                Share Progress
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          {/* Earned Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                Earned Achievements ({earnedAchievements.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {earnedAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
                  >
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold">{achievement.name}</div>
                      <div className="text-sm text-muted-foreground">{achievement.description}</div>
                    </div>
                    <Badge className="bg-yellow-500 text-white">Earned</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Available Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Available Achievements ({availableAchievements.length})</CardTitle>
              <CardDescription>Keep training to unlock these rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {availableAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3 p-3 border rounded-lg opacity-60">
                    <div className="text-2xl grayscale">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold">{achievement.name}</div>
                      <div className="text-sm text-muted-foreground">{achievement.description}</div>
                    </div>
                    <Badge variant="outline">Locked</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications">Training Reminders</Label>
                  <div className="text-sm text-muted-foreground">Get notified about your daily training</div>
                </div>
                <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <div className="text-sm text-muted-foreground">Switch to dark theme</div>
                </div>
                <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </CardContent>
          </Card>

          {/* Audio Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                Audio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sound">Sound Effects</Label>
                  <div className="text-sm text-muted-foreground">Enable game sounds and feedback</div>
                </div>
                <Switch id="sound" checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>
            </CardContent>
          </Card>

          {/* Training Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Training Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Daily Training Goal (minutes)</Label>
                <div className="mt-2">
                  <Slider value={dailyGoal} onValueChange={setDailyGoal} max={60} min={5} step={5} className="w-full" />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>5 min</span>
                    <span className="font-medium">{dailyGoal[0]} minutes</span>
                    <span>60 min</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weekly-goal">Weekly Session Goal</Label>
                <Input
                  id="weekly-goal"
                  type="number"
                  value={userStats.weeklyGoal}
                  onChange={(e) =>
                    onUpdateStats({
                      ...userStats,
                      weeklyGoal: Number.parseInt(e.target.value) || 5,
                    })
                  }
                  min="1"
                  max="21"
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full bg-transparent">
                Reset Progress
              </Button>
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
