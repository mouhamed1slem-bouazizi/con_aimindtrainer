"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Pause, Play } from "lucide-react"
import NBackChallenge from "./games/nback-challenge"

interface GameSessionProps {
  game: {
    id: string
    name: string
    description: string
    difficulty: string
    duration: string
    type: string
  }
  onComplete: (results: any) => void
  onExit: () => void
}

export default function GameSession({ game, onComplete, onExit }: GameSessionProps) {
  const [gameState, setGameState] = useState<"loading" | "playing" | "paused">("loading")
  const [score, setScore] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [accuracy, setAccuracy] = useState(0)

  // Timer for generic games
  useEffect(() => {
    if (gameState === "playing" && game.id !== "n-back-spatial") {
      const timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [gameState, game.id])

  // Start game after loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setGameState("playing")
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Handle N-Back Challenge specifically
  if (game.id === "n-back-spatial") {
    return (
      <NBackChallenge
        onComplete={(results) => {
          // Don't call onComplete immediately, let the N-Back component handle its own completion screen
          console.log("N-Back game completed with results:", results)
        }}
        onExit={onExit}
      />
    )
  }

  // Generic game template for other games
  const completeDemo = () => {
    const demoResults = {
      score: Math.floor(Math.random() * 1000) + 500,
      accuracy: Math.floor(Math.random() * 30) + 70,
      xpEarned: Math.floor(Math.random() * 100) + 50,
      gameName: game.name,
      gameType: game.type,
      timeElapsed,
    }
    onComplete(demoResults)
  }

  if (gameState === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="container mx-auto max-w-md">
          <div className="flex items-center justify-center min-h-screen">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold">Loading {game.name}...</h3>
                <p className="text-muted-foreground">Preparing your cognitive training session</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="container mx-auto max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="sm" onClick={onExit}>
            <X className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-semibold">{game.name}</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setGameState(gameState === "playing" ? "paused" : "playing")}
          >
            {gameState === "playing" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{score}</div>
              <div className="text-sm text-muted-foreground">Score</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{formatTime(timeElapsed)}</div>
              <div className="text-sm text-muted-foreground">Time</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{accuracy}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </CardContent>
          </Card>
        </div>

        {/* Game Content */}
        <Card>
          <CardContent className="p-6">
            {gameState === "paused" ? (
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Game Paused</h3>
                <p className="text-muted-foreground">Take a break and resume when ready</p>
                <Button onClick={() => setGameState("playing")}>
                  <Play className="h-4 w-4 mr-2" />
                  Resume Game
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Coming Soon!</h3>
                  <p className="text-muted-foreground">This game is under development.</p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                      <strong>Game:</strong> {game.name}
                    </p>
                    <p>
                      <strong>Type:</strong> {game.type}
                    </p>
                    <p>
                      <strong>Difficulty:</strong> {game.difficulty}
                    </p>
                    <p>
                      <strong>Duration:</strong> {game.duration}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">What to Expect:</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200">{game.description}</p>
                  </div>

                  <Button onClick={completeDemo} size="lg" className="w-full">
                    Complete Demo
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Game Instructions */}
        <Card className="mt-4">
          <CardContent className="p-4">
            <h4 className="font-semibold mb-2">How to Play:</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              {game.type === "Spatial Memory" && (
                <>
                  <p>• Watch the sequence of highlighted positions</p>
                  <p>• Remember the pattern and timing</p>
                  <p>• Reproduce the sequence accurately</p>
                  <p>• Progress through increasing difficulty levels</p>
                </>
              )}
              {game.type === "Stroop Task" && (
                <>
                  <p>• Read the color names displayed</p>
                  <p>• Identify the actual color of the text</p>
                  <p>• Respond as quickly and accurately as possible</p>
                  <p>• Ignore the word meaning, focus on color</p>
                </>
              )}
              {game.type === "Visual Search" && (
                <>
                  <p>• Scan the display for target symbols</p>
                  <p>• Identify matches as quickly as possible</p>
                  <p>• Maintain accuracy under time pressure</p>
                  <p>• Progress through increasing complexity</p>
                </>
              )}
              {!["Spatial Memory", "Stroop Task", "Visual Search"].includes(game.type) && (
                <>
                  <p>• Follow the on-screen instructions</p>
                  <p>• Respond quickly and accurately</p>
                  <p>• Focus on the cognitive challenge</p>
                  <p>• Track your improvement over time</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
