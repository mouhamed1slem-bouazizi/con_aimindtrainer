"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, TrendingUp, User, Play, BarChart3, Star } from "lucide-react"
import Dashboard from "./components/dashboard"
import ProgressTracker from "./components/progress-tracker"
import AICoach from "./components/ai-coach"
import UserProfile from "./components/user-profile"
import GameSession from "./components/game-session"
import TrainingCategories from "./components/training-categories"
import CategoryGames from "./components/category-games"

export default function MindTrainerApp() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [currentGame, setCurrentGame] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [userStats, setUserStats] = useState({
    totalSessions: 47,
    currentStreak: 12,
    totalXP: 2840,
    cognitiveScore: 78,
    weeklyGoal: 5,
    completedThisWeek: 3,
  })

  const [cognitiveScores, setCognitiveScores] = useState({
    workingMemory: 82,
    processingSpeed: 75,
    attention: 88,
    flexibility: 71,
    problemSolving: 79,
    visualProcessing: 85,
    executiveFunction: 73,
    verbalFluency: 77,
    numericalReasoning: 81,
    memoryConsolidation: 76,
  })

  if (currentGame) {
    return (
      <GameSession
        game={currentGame}
        onComplete={(results) => {
          // Update user stats based on game results
          setUserStats((prev) => ({
            ...prev,
            totalSessions: prev.totalSessions + 1,
            totalXP: prev.totalXP + results.xpEarned,
          }))
          setCurrentGame(null)
        }}
        onExit={() => setCurrentGame(null)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mind Trainer</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              <Star className="h-3 w-3 mr-1" />
              {userStats.totalXP} XP
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="dashboard" className="flex flex-col gap-1 py-2">
              <BarChart3 className="h-4 w-4" />
              <span className="text-xs">Home</span>
            </TabsTrigger>
            <TabsTrigger value="training" className="flex flex-col gap-1 py-2">
              <Play className="h-4 w-4" />
              <span className="text-xs">Train</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex flex-col gap-1 py-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs">Progress</span>
            </TabsTrigger>
            <TabsTrigger value="coach" className="flex flex-col gap-1 py-2">
              <Brain className="h-4 w-4" />
              <span className="text-xs">Coach</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex flex-col gap-1 py-2">
              <User className="h-4 w-4" />
              <span className="text-xs">Profile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <Dashboard
              userStats={userStats}
              cognitiveScores={cognitiveScores}
              onStartTraining={() => setActiveTab("training")}
            />
          </TabsContent>

          <TabsContent value="training" className="space-y-4">
            {selectedCategory ? (
              <CategoryGames
                category={selectedCategory}
                onGameSelect={setCurrentGame}
                onBack={() => setSelectedCategory(null)}
                cognitiveScores={cognitiveScores}
              />
            ) : (
              <TrainingCategories onCategorySelect={setSelectedCategory} cognitiveScores={cognitiveScores} />
            )}
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <ProgressTracker userStats={userStats} cognitiveScores={cognitiveScores} />
          </TabsContent>

          <TabsContent value="coach" className="space-y-4">
            <AICoach userStats={userStats} cognitiveScores={cognitiveScores} />
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <UserProfile userStats={userStats} onUpdateStats={setUserStats} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
