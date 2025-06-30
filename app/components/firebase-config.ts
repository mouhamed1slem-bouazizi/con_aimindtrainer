// Firebase configuration for Mind Trainer App
// This would be implemented with actual Firebase SDK in production

export const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "mind-trainer-app.firebaseapp.com",
  projectId: "mind-trainer-app",
  storageBucket: "mind-trainer-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
}

// Mock Firebase functions for demonstration
export const mockFirebaseAuth = {
  signIn: async (email: string, password: string) => {
    // Mock authentication
    return { user: { uid: "mock-user-id", email } }
  },

  signUp: async (email: string, password: string) => {
    // Mock user creation
    return { user: { uid: "mock-user-id", email } }
  },

  signOut: async () => {
    // Mock sign out
    return true
  },
}

export const mockFirestore = {
  saveUserProgress: async (userId: string, data: any) => {
    // Mock save to Firestore
    localStorage.setItem(`user-${userId}`, JSON.stringify(data))
    return true
  },

  getUserProgress: async (userId: string) => {
    // Mock retrieve from Firestore
    const data = localStorage.getItem(`user-${userId}`)
    return data ? JSON.parse(data) : null
  },

  saveGameSession: async (userId: string, sessionData: any) => {
    // Mock save game session
    const sessions = JSON.parse(localStorage.getItem(`sessions-${userId}`) || "[]")
    sessions.push({ ...sessionData, timestamp: Date.now() })
    localStorage.setItem(`sessions-${userId}`, JSON.stringify(sessions))
    return true
  },
}

// Adaptive difficulty algorithm
export const adaptiveDifficulty = {
  calculateNewDifficulty: (currentLevel: number, recentPerformance: number[], accuracy: number) => {
    // Increase difficulty if accuracy > 80% for 5 consecutive trials
    if (accuracy > 80 && recentPerformance.slice(-5).every((score) => score > 80)) {
      return Math.min(currentLevel + 1, 10) // Max level 10
    }

    // Decrease difficulty if accuracy < 60% for 3 consecutive trials
    if (accuracy < 60 && recentPerformance.slice(-3).every((score) => score < 60)) {
      return Math.max(currentLevel - 1, 1) // Min level 1
    }

    return currentLevel
  },

  getGameParameters: (level: number, gameType: string) => {
    const baseParams = {
      "working-memory": {
        nBackLevel: Math.min(level, 4),
        sequenceLength: 15 + level * 5,
        stimulusDuration: Math.max(500 - level * 50, 200),
      },
      "processing-speed": {
        responseTime: Math.max(2000 - level * 200, 500),
        stimulusCount: 10 + level * 2,
        distractorRatio: Math.min(0.1 + level * 0.1, 0.5),
      },
    }

    return baseParams[gameType] || {}
  },
}
