"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { X, Pause, Play, RotateCcw, Volume2, VolumeX, Trophy, Target, Clock, Zap, ArrowLeft } from "lucide-react"

interface NBackChallengeProps {
  onComplete: (results: any) => void
  onExit: () => void
}

interface GameSettings {
  level: number
  nBackLevel: number
  sequenceLength: number
  stimulusDuration: number
  interStimulusInterval: number
  gridSize: number
  soundEnabled: boolean
}

export default function NBackChallenge({ onComplete, onExit }: NBackChallengeProps) {
  const [gameState, setGameState] = useState<"menu" | "playing" | "paused" | "completed">("menu")
  const [settings, setSettings] = useState<GameSettings>({
    level: 1,
    nBackLevel: 2,
    sequenceLength: 20,
    stimulusDuration: 500,
    interStimulusInterval: 2500,
    gridSize: 3,
    soundEnabled: true,
  })

  // Game state
  const [sequence, setSequence] = useState<number[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [showFeedback, setShowFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [currentPosition, setCurrentPosition] = useState<number | null>(null)
  const [showStimulus, setShowStimulus] = useState(false)
  const [gameProgress, setGameProgress] = useState(0)

  // Session tracking
  const [sessionStartTime, setSessionStartTime] = useState<number>(0)
  const [responseStartTime, setResponseStartTime] = useState<number>(0)
  const [responseTimes, setResponseTimes] = useState<number[]>([])
  const [currentStreak, setCurrentStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)

  // Audio refs
  const correctSoundRef = useRef<HTMLAudioElement | null>(null)
  const incorrectSoundRef = useRef<HTMLAudioElement | null>(null)
  const stimulusSoundRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio
  useEffect(() => {
    if (typeof window !== "undefined") {
      correctSoundRef.current = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
      )
      incorrectSoundRef.current = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
      )
      stimulusSoundRef.current = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
      )
    }
  }, [])

  // Calculate difficulty parameters based on level
  const calculateDifficulty = useCallback(
    (level: number): GameSettings => {
      const baseSettings = {
        level,
        nBackLevel: Math.min(2 + Math.floor((level - 1) / 25), 6), // 2-back to 6-back
        sequenceLength: Math.min(20 + Math.floor((level - 1) / 10) * 5, 50), // 20 to 50 items
        stimulusDuration: Math.max(500 - Math.floor((level - 1) / 20) * 50, 200), // 500ms to 200ms
        interStimulusInterval: Math.max(2500 - Math.floor((level - 1) / 15) * 100, 1000), // 2.5s to 1s
        gridSize: level <= 50 ? 3 : level <= 100 ? 4 : level <= 150 ? 5 : level <= 200 ? 6 : 7, // 3x3 to 7x7
        soundEnabled: settings.soundEnabled,
      }
      return baseSettings
    },
    [settings.soundEnabled],
  )

  // Generate sequence
  const generateSequence = useCallback(() => {
    const gridCells = settings.gridSize * settings.gridSize
    const newSequence: number[] = []

    for (let i = 0; i < settings.sequenceLength; i++) {
      // For higher levels, add some strategic matches
      if (i >= settings.nBackLevel && Math.random() < 0.3) {
        // 30% chance of match
        newSequence.push(newSequence[i - settings.nBackLevel])
      } else {
        newSequence.push(Math.floor(Math.random() * gridCells))
      }
    }

    setSequence(newSequence)
    setCurrentIndex(0)
  }, [settings])

  // Start game
  const startGame = (level = 1) => {
    const newSettings = calculateDifficulty(level)
    setSettings(newSettings)
    setGameState("playing")
    setScore(0)
    setCorrectAnswers(0)
    setTotalQuestions(0)
    setCurrentIndex(0)
    setGameProgress(0)
    setResponseTimes([])
    setCurrentStreak(0)
    setBestStreak(0)
    setSessionStartTime(Date.now())

    generateSequence()
  }

  // Play sound effect
  const playSound = (type: "correct" | "incorrect" | "stimulus") => {
    if (!settings.soundEnabled) return

    try {
      const audio =
        type === "correct"
          ? correctSoundRef.current
          : type === "incorrect"
            ? incorrectSoundRef.current
            : stimulusSoundRef.current

      if (audio) {
        audio.currentTime = 0
        audio.play().catch(() => {}) // Ignore audio play errors
      }
    } catch (error) {
      // Ignore audio errors
    }
  }

  // Game loop
  useEffect(() => {
    if (gameState !== "playing" || currentIndex >= sequence.length) return

    const showStimulusTimer = setTimeout(() => {
      setCurrentPosition(sequence[currentIndex])
      setShowStimulus(true)
      setResponseStartTime(Date.now()) // Start timing for response
      playSound("stimulus")

      const hideStimulusTimer = setTimeout(() => {
        setShowStimulus(false)
        setCurrentPosition(null)
      }, settings.stimulusDuration)

      return () => clearTimeout(hideStimulusTimer)
    }, 100)

    return () => clearTimeout(showStimulusTimer)
  }, [gameState, currentIndex, sequence, settings])

  // Handle user response
  const handleResponse = (isMatch: boolean) => {
    if (currentIndex < settings.nBackLevel) return

    const responseTime = Date.now() - responseStartTime
    const actualMatch = sequence[currentIndex] === sequence[currentIndex - settings.nBackLevel]
    const correct = isMatch === actualMatch

    setTotalQuestions((prev) => prev + 1)
    setResponseTimes((prev) => [...prev, responseTime])

    if (correct) {
      setCorrectAnswers((prev) => prev + 1)
      setScore((prev) => prev + 10 * settings.nBackLevel)
      setShowFeedback("correct")
      setCurrentStreak((prev) => {
        const newStreak = prev + 1
        setBestStreak((current) => Math.max(current, newStreak))
        return newStreak
      })
      playSound("correct")
    } else {
      setShowFeedback("incorrect")
      setCurrentStreak(0)
      playSound("incorrect")
    }

    // Update progress
    setGameProgress(((currentIndex + 1) / sequence.length) * 100)

    setTimeout(() => {
      setShowFeedback(null)
      if (currentIndex < sequence.length - 1) {
        setCurrentIndex((prev) => prev + 1)
      } else {
        // Game completed
        setTimeout(() => {
          setGameState("completed")
        }, 500)
      }
    }, 1000)
  }

  // Auto-advance after stimulus interval
  useEffect(() => {
    if (gameState === "playing" && !showStimulus && currentIndex < sequence.length) {
      const timer = setTimeout(() => {
        if (currentIndex >= settings.nBackLevel && !showFeedback) {
          // Auto-advance if no response given (count as incorrect)
          const responseTime = Date.now() - responseStartTime
          setTotalQuestions((prev) => prev + 1)
          setResponseTimes((prev) => [...prev, responseTime])
          setCurrentStreak(0)

          // Update progress
          setGameProgress(((currentIndex + 1) / sequence.length) * 100)

          if (currentIndex < sequence.length - 1) {
            setCurrentIndex((prev) => prev + 1)
          } else {
            // Game completed
            setTimeout(() => {
              setGameState("completed")
            }, 500)
          }
        } else if (currentIndex < settings.nBackLevel) {
          setCurrentIndex((prev) => prev + 1)
          setGameProgress(((currentIndex + 1) / sequence.length) * 100)
        }
      }, settings.interStimulusInterval)

      return () => clearTimeout(timer)
    }
  }, [gameState, showStimulus, currentIndex, showFeedback, settings, responseStartTime])

  // Format time display
  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const formatResponseTime = (milliseconds: number) => {
    return `${milliseconds}ms`
  }

  // Handle back to category
  const handleBackToCategory = () => {
    onExit()
  }

  // Handle next level
  const handleNextLevel = () => {
    const nextLevel = Math.min(settings.level + 1, 250)
    startGame(nextLevel)
  }

  // Level selection menu
  if (gameState === "menu") {
    const levelGroups = [
      { name: "Beginner", range: [1, 25], color: "bg-green-500" },
      { name: "Intermediate", range: [26, 75], color: "bg-blue-500" },
      { name: "Advanced", range: [76, 150], color: "bg-orange-500" },
      { name: "Expert", range: [151, 200], color: "bg-red-500" },
      { name: "Master", range: [201, 250], color: "bg-purple-500" },
    ]

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="container mx-auto max-w-2xl">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="sm" onClick={onExit}>
              <X className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">N-Back Challenge</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSettings((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
            >
              {settings.soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>🧠 N-Back Memory Challenge</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Test your working memory by identifying when the current position matches the position from N steps
                back. Progress through 250 levels with increasing difficulty!
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Features:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>250 progressive levels</li>
                    <li>2-back to 6-back challenges</li>
                    <li>Adaptive grid sizes (3x3 to 7x7)</li>
                    <li>Sound effects & feedback</li>
                  </ul>
                </div>
                <div>
                  <strong>Benefits:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Improves working memory</li>
                    <li>Enhances focus & attention</li>
                    <li>Builds cognitive flexibility</li>
                    <li>Strengthens neural pathways</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center">Select Level</h2>
            {levelGroups.map((group, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${group.color}`} />
                      <h3 className="font-semibold">{group.name}</h3>
                      <Badge variant="outline">
                        Levels {group.range[0]}-{group.range[1]}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: group.range[1] - group.range[0] + 1 }, (_, i) => {
                      const level = group.range[0] + i
                      return (
                        <Button
                          key={level}
                          variant="outline"
                          size="sm"
                          onClick={() => startGame(level)}
                          className="h-8 text-xs"
                        >
                          {level}
                        </Button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Game completion screen with detailed stats
  if (gameState === "completed") {
    const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0
    const nextLevel = Math.min(settings.level + 1, 250)
    const totalTime = Date.now() - sessionStartTime
    const xpEarned = Math.round(score * 0.1 + accuracy * 2)

    // Calculate response time statistics
    const avgResponseTime =
      responseTimes.length > 0 ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length : 0
    const fastestResponse = responseTimes.length > 0 ? Math.min(...responseTimes) : 0
    const slowestResponse = responseTimes.length > 0 ? Math.max(...responseTimes) : 0

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="mt-8">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl flex items-center justify-center gap-2">
                {accuracy >= 80 ? (
                  <>
                    <Trophy className="h-8 w-8 text-yellow-500" />
                    Level Complete!
                  </>
                ) : (
                  <>
                    <Target className="h-8 w-8 text-blue-500" />
                    Keep Training!
                  </>
                )}
              </CardTitle>
              <p className="text-muted-foreground">
                {accuracy >= 80
                  ? "Excellent performance! You've unlocked the next level."
                  : "Good effort! Practice makes perfect."}
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Main Performance Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{score}</div>
                    <div className="text-sm text-muted-foreground">Total Score</div>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 dark:bg-green-900/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50 dark:bg-purple-900/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">+{xpEarned}</div>
                    <div className="text-sm text-muted-foreground">XP Earned</div>
                  </CardContent>
                </Card>
                <Card className="bg-orange-50 dark:bg-orange-900/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">{formatTime(totalTime)}</div>
                    <div className="text-sm text-muted-foreground">Total Time</div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Session Statistics */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Game Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Game Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Level:</span>
                      <span className="font-semibold">{settings.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">N-Back Level:</span>
                      <span className="font-semibold">{settings.nBackLevel}-back</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Grid Size:</span>
                      <span className="font-semibold">
                        {settings.gridSize}×{settings.gridSize}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Questions:</span>
                      <span className="font-semibold">{totalQuestions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Correct Answers:</span>
                      <span className="font-semibold text-green-600">{correctAnswers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Incorrect Answers:</span>
                      <span className="font-semibold text-red-600">{totalQuestions - correctAnswers}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Best Streak:</span>
                      <span className="font-semibold text-yellow-600">{bestStreak} correct</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Average Response:</span>
                      <span className="font-semibold">{formatResponseTime(Math.round(avgResponseTime))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fastest Response:</span>
                      <span className="font-semibold text-green-600">{formatResponseTime(fastestResponse)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Slowest Response:</span>
                      <span className="font-semibold text-red-600">{formatResponseTime(slowestResponse)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Session Duration:</span>
                      <span className="font-semibold">{formatTime(totalTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Points per Minute:</span>
                      <span className="font-semibold">{Math.round(score / (totalTime / 60000) || 0)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Performance Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Accuracy Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Accuracy Rate</span>
                        <span>{accuracy}%</span>
                      </div>
                      <Progress value={accuracy} className="h-3" />
                      <div className="text-xs text-muted-foreground mt-1">
                        {accuracy >= 80 ? "Excellent! Ready for next level." : "Keep practicing to improve accuracy."}
                      </div>
                    </div>

                    {/* Response Time Analysis */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{formatResponseTime(fastestResponse)}</div>
                        <div className="text-xs text-muted-foreground">Fastest</div>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">
                          {formatResponseTime(Math.round(avgResponseTime))}
                        </div>
                        <div className="text-xs text-muted-foreground">Average</div>
                      </div>
                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                        <div className="text-lg font-bold text-red-600">{formatResponseTime(slowestResponse)}</div>
                        <div className="text-xs text-muted-foreground">Slowest</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleBackToCategory} className="flex-1 bg-transparent">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Games
                </Button>
                <Button variant="outline" onClick={() => startGame(settings.level)}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
                {accuracy >= 80 && nextLevel <= 250 ? (
                  <Button onClick={handleNextLevel} className="flex-1">
                    <Trophy className="h-4 w-4 mr-2" />
                    Level {nextLevel}
                  </Button>
                ) : (
                  <Button onClick={() => startGame(settings.level)} className="flex-1">
                    Try Again
                  </Button>
                )}
              </div>

              {/* Next Level Preview */}
              {accuracy >= 80 && nextLevel <= 250 && (
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">🎯 Next Level Preview</h4>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Level {nextLevel}:</strong> {calculateDifficulty(nextLevel).nBackLevel}-back challenge
                      </p>
                      <p>
                        <strong>Grid:</strong> {calculateDifficulty(nextLevel).gridSize}×
                        {calculateDifficulty(nextLevel).gridSize}
                      </p>
                      <p>
                        <strong>Difficulty:</strong>{" "}
                        {nextLevel <= 25
                          ? "Beginner"
                          : nextLevel <= 75
                            ? "Intermediate"
                            : nextLevel <= 150
                              ? "Advanced"
                              : nextLevel <= 200
                                ? "Expert"
                                : "Master"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Main game interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="container mx-auto max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="sm" onClick={onExit}>
            <X className="h-4 w-4" />
          </Button>
          <div className="text-center">
            <h1 className="font-semibold">Level {settings.level}</h1>
            <Badge variant="outline">{settings.nBackLevel}-Back</Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setGameState(gameState === "playing" ? "paused" : "playing")}
          >
            {gameState === "playing" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>
              {currentIndex + 1}/{sequence.length}
            </span>
          </div>
          <Progress value={gameProgress} className="h-2" />
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold">{score}</div>
              <div className="text-xs text-muted-foreground">Score</div>
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
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold">{currentStreak}</div>
              <div className="text-xs text-muted-foreground">Streak</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold">{bestStreak}</div>
              <div className="text-xs text-muted-foreground">Best</div>
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
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">{settings.nBackLevel}-Back Challenge</h3>
                  <p className="text-sm text-muted-foreground">
                    Press "Match" if the current position matches the position from {settings.nBackLevel} steps back
                  </p>
                </div>

                {/* Grid */}
                <div
                  className="grid gap-2 mx-auto"
                  style={{
                    gridTemplateColumns: `repeat(${settings.gridSize}, minmax(0, 1fr))`,
                    maxWidth: `${settings.gridSize * 3}rem`,
                  }}
                >
                  {Array.from({ length: settings.gridSize * settings.gridSize }, (_, i) => (
                    <div
                      key={i}
                      className={`aspect-square border-2 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        showStimulus && i === currentPosition
                          ? "bg-blue-500 border-blue-600 scale-110"
                          : "bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                      }`}
                    >
                      {showStimulus && i === currentPosition && (
                        <div className="w-1/2 h-1/2 bg-white rounded-full animate-pulse" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Response Buttons */}
                <div className="flex gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleResponse(false)}
                    disabled={showFeedback !== null || currentIndex < settings.nBackLevel || showStimulus}
                  >
                    No Match
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => handleResponse(true)}
                    disabled={showFeedback !== null || currentIndex < settings.nBackLevel || showStimulus}
                  >
                    Match!
                  </Button>
                </div>

                {/* Feedback */}
                {showFeedback && (
                  <div className="text-center">
                    <Badge
                      variant={showFeedback === "correct" ? "default" : "destructive"}
                      className="text-lg px-4 py-2"
                    >
                      {showFeedback === "correct" ? "✓ Correct!" : "✗ Incorrect"}
                    </Badge>
                  </div>
                )}

                {/* Instructions for early trials */}
                {currentIndex < settings.nBackLevel && (
                  <div className="text-center">
                    <Badge variant="secondary">
                      Memorizing... ({currentIndex + 1}/{settings.nBackLevel})
                    </Badge>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
