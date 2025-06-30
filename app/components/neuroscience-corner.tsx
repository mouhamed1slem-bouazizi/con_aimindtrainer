"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Zap, RefreshCw, Loader2 } from "lucide-react"

export default function NeuroscienceCorner() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [content, setContent] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const topics = [
    {
      id: "memory-brain",
      title: "Memory & Brain",
      description: "How cognitive training reshapes your neural networks",
      icon: Brain,
      color: "bg-blue-500",
    },
    {
      id: "reaction-time",
      title: "Reaction Time",
      description: "The neuroscience behind faster cognitive responses",
      icon: Zap,
      color: "bg-yellow-500",
    },
  ]

  const generateContent = async (topicId: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/neuroscience", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: topicId }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate content")
      }

      const data = await response.json()
      setContent(data.content)
      setSelectedTopic(topicId)
    } catch (err) {
      setError("Error generating content: " + (err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const refreshContent = () => {
    if (selectedTopic) {
      generateContent(selectedTopic)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">🧠 Neuroscience Corner</h2>
        <p className="text-muted-foreground">Discover the science behind your brain training journey</p>
      </div>

      {/* Topic Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map((topic) => {
          const IconComponent = topic.icon
          return (
            <Card
              key={topic.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedTopic === topic.id ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => generateContent(topic.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${topic.color}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Content Display */}
      {(loading || content || error) && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">
              {selectedTopic && topics.find((t) => t.id === selectedTopic)?.title}
            </CardTitle>
            {content && !loading && (
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  AI Generated
                </Badge>
                <Button variant="ghost" size="sm" onClick={refreshContent} disabled={loading}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <span>Generating neuroscience insights...</span>
              </div>
            )}

            {error && <div className="text-red-500 text-center py-4">{error}</div>}

            {content && !loading && (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p className="text-sm leading-relaxed whitespace-pre-line">{content}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
