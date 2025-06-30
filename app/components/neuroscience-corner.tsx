"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Zap, RefreshCw, Sparkles, BookOpen, Lightbulb } from "lucide-react"

interface NeuroscienceCornerProps {
  className?: string
}

export default function NeuroscienceCorner({ className }: NeuroscienceCornerProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>("Memory & Brain")
  const [content, setContent] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)

  const topics = [
    {
      id: "Memory & Brain",
      title: "Memory & Brain",
      icon: Brain,
      description: "How brain training enhances memory and cognitive function",
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
    },
    {
      id: "Reaction Time",
      title: "Reaction Time",
      icon: Zap,
      description: "The neuroscience behind faster reactions and processing speed",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    },
  ]

  const generateContent = async (topic: string) => {
    setIsLoading(true)
    setSelectedTopic(topic)

    try {
      const response = await fetch("/api/neuroscience", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setContent(data.content)
      setHasGenerated(true)
    } catch (error) {
      console.error("Error generating content:", error)
      setContent("Unable to generate content at this time. Please try again later.")
      setHasGenerated(true)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshContent = () => {
    generateContent(selectedTopic)
  }

  return (
    <Card
      className={`border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 ${className}`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-400">
          <BookOpen className="h-5 w-5" />
          Neuroscience Corner
          <Sparkles className="h-4 w-4 text-yellow-500" />
        </CardTitle>
        <CardDescription className="text-blue-600 dark:text-blue-300">
          Discover the science behind cognitive training
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Topic Selection */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300">Choose a Topic:</h4>
          <div className="grid grid-cols-1 gap-3">
            {topics.map((topic) => {
              const IconComponent = topic.icon
              return (
                <button
                  key={topic.id}
                  onClick={() => generateContent(topic.id)}
                  disabled={isLoading}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md ${
                    selectedTopic === topic.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 hover:border-blue-300 bg-white dark:bg-gray-800 dark:border-gray-700"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${topic.color}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{topic.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{topic.description}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Generated Content */}
        {(content || isLoading) && (
          <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">Neuroscience</Badge>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{selectedTopic}</span>
              </div>
              {hasGenerated && !isLoading && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={refreshContent}
                  className="flex items-center gap-1 bg-transparent"
                >
                  <RefreshCw className="h-3 w-3" />
                  Refresh
                </Button>
              )}
            </div>

            {isLoading ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Generating neuroscience insights...</span>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/5"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{content}</p>
              </div>
            )}
          </div>
        )}

        {/* Call to Action */}
        {!content && !isLoading && (
          <div className="text-center py-6">
            <Lightbulb className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Select a topic above to discover fascinating neuroscience insights about brain training!
            </p>
            <Button
              onClick={() => generateContent("Memory & Brain")}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Start Learning
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
