"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Pause, Play, RotateCcw } from "lucide-react"

interface GameSessionProps {
  game: any
  onComplete: (results: any) => void
  onExit: () => void
}

export default function GameSession({ game, onComplete, onExit }: GameSessionProps) {
  const [gameState, setGameState] = useState("playing") // playing, paused, completed
  const [currentLevel, setCurrentLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutes in seconds
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [currentColor, setCurrentColor] = useState("red")
  const [currentWord, setCurrentWord] = useState("RED")
  const [isCongruent, setIsCongruent] = useState(true)

  // N-Back Memory Game Logic
  const [sequence, setSequence] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userResponse, setUserResponse] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)

  // Generate random sequence for N-Back game
  const generateSequence = useCallback(() => {
    const positions = []
    for (let i = 0; i < 20; i++) {
      positions.push(Math.floor(Math.random() * 9)) // 3x3 grid
    }
    setSequence(positions)
    setCurrentIndex(0)
  }, [])

  // Initialize game
  useEffect(() => {
    if (game.id === "working-memory") {
      generateSequence()
    }
  }, [game, generateSequence])

  // Timer logic
  useEffect(() => {
    if (gameState === "playing" && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeRemaining === 0) {
      completeGame()
    }
  }, [gameState, timeRemaining])

  useEffect(() => {
    const newColor = ["red", "blue", "green", "yellow"][Math.floor(Math.random() * 4)]
    const newWord = ["RED", "BLUE", "GREEN", "YELLOW"][Math.floor(Math.random() * 4)]
    setCurrentColor(newColor)
    setCurrentWord(newWord)
    setIsCongruent(newColor.toLowerCase() === newWord.toLowerCase())
  }, [totalQuestions])

  const completeGame = () => {
    const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0
    const xpEarned = Math.round(score * 0.1 + accuracy * 2)

    setGameState("completed")
    onComplete({
      score,
      accuracy,
      level: currentLevel,
      xpEarned,
      timeSpent: 300 - timeRemaining,
    })
  }

  const handleNBackResponse = (isMatch: boolean) => {
    if (currentIndex < 2) return // Need at least 2 items for N-Back

    const actualMatch = sequence[currentIndex] === sequence[currentIndex - 2]
    const correct = isMatch === actualMatch

    setTotalQuestions((prev) => prev + 1)
    if (correct) {
      setCorrectAnswers((prev) => prev + 1)
      setScore((prev) => prev + 10)
    }

    setShowFeedback(true)
    setTimeout(() => {
      setShowFeedback(false)
      if (currentIndex < sequence.length - 1) {
        setCurrentIndex((prev) => prev + 1)
      } else {
        completeGame()
      }
    }, 1000)
  }

  const handleColorResponse = (response: boolean) => {
    const correct = response === isCongruent
    setTotalQuestions((prev) => prev + 1)
    if (correct) {
      setCorrectAnswers((prev) => prev + 1)
      setScore((prev) => prev + 5)
    }

    // Generate new question
    setTimeout(() => {
      const newColor = ["red", "blue", "green", "yellow"][Math.floor(Math.random() * 4)]
      const newWord = ["RED", "BLUE", "GREEN", "YELLOW"][Math.floor(Math.random() * 4)]
      setCurrentColor(newColor)
      setCurrentWord(newWord)
      setIsCongruent(newColor.toLowerCase() === newWord.toLowerCase())
    }, 500)
  }

  const renderNBackGame = () => {
    const currentPosition = sequence[currentIndex]

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">2-Back Memory Challenge</h3>
          <p className="text-sm text-muted-foreground">
            Press "Match" if the current position matches the position from 2 steps back
          </p>
        </div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto">
          {Array.from({ length: 9 }, (_, i) => (
            <div
              key={i}
              className={`w-14 h-14 border-2 rounded-lg flex items-center justify-center ${
                i === currentPosition
                  ? "bg-blue-500 border-blue-600"
                  : "bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
              }`}
            >
              {i === currentPosition && <div className="w-6 h-6 bg-white rounded-full" />}
            </div>
          ))}
        </div>

        {/* Response Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleNBackResponse(false)}
            disabled={showFeedback || currentIndex < 2}
          >
            No Match
          </Button>
          <Button size="lg" onClick={() => handleNBackResponse(true)} disabled={showFeedback || currentIndex < 2}>
            Match!
          </Button>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className="text-center">
            <Badge variant={correctAnswers > totalQuestions - correctAnswers ? "default" : "destructive"}>
              {correctAnswers > totalQuestions - correctAnswers ? "Correct!" : "Incorrect"}
            </Badge>
          </div>
        )}

        {/* Progress */}
        <div className="text-center text-sm text-muted-foreground">
          Position {currentIndex + 1} of {sequence.length}
        </div>
      </div>
    )
  }

  const renderColorRushGame = () => {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Color Rush</h3>
          <p className="text-sm text-muted-foreground">Does the word color match the text color?</p>
        </div>

        <div className="text-center">
          <div className="text-6xl font-bold mb-6" style={{ color: currentColor }}>
            {currentWord}
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Button size="lg" variant="outline" onClick={() => handleColorResponse(false)}>
            No Match
          </Button>
          <Button size="lg" onClick={() => handleColorResponse(true)}>
            Match!
          </Button>
        </div>
      </div>
    )
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (gameState === "completed") {
    const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="container mx-auto max-w-md">
          <Card className="mt-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">🎉 Great Job!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{score}</div>
                    <div className="text-sm text-muted-foreground">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Correct Answers:</span>
                    <span>
                      {correctAnswers}/{totalQuestions}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>XP Earned:</span>
                    <span className="text-yellow-600 font-semibold">+{Math.round(score * 0.1 + accuracy * 2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => window.location.reload()}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Play Again
                </Button>
                <Button onClick={onExit} className="flex-1">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
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
          <h1 className="font-semibold">{game.name}</h1>
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
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold">{score}</div>
              <div className="text-xs text-muted-foreground">Score</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold">{formatTime(timeRemaining)}</div>
              <div className="text-xs text-muted-foreground">Time</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold">
                {totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0}%
              </div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </CardContent>
          </Card>
        </div>

        {/* Game Content */}
        <Card>
          <CardContent className="p-6">
            {gameState === "paused" ? (
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Game Paused</h3>
                <Button onClick={() => setGameState("playing")}>
                  <Play className="h-4 w-4 mr-2" />
                  Resume
                </Button>
              </div>
            ) : (
              <>
                {game.id === "working-memory" && renderNBackGame()}
                {game.id === "processing-speed" && renderColorRushGame()}
                {!["working-memory", "processing-speed"].includes(game.id) && (
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-semibold">Coming Soon!</h3>
                    <p className="text-muted-foreground">This game is under development.</p>
                    <Button onClick={completeGame}>Complete Demo</Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
