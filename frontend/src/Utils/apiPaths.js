export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  auth: {
    register: "/api/auth/register", // Register user
    login: "/api/auth/login", // Authenticate user and return JWT token
    profile: "/api/auth/profile", // Get logged-in user details
  },

  image: {
    uploadImage: "/api/auth/upload-image", // Upload profile picture
  },

  sessions: {
    create: "/api/sessions/create", // Create a new interview session with questions
    mySessions: "/api/sessions/my-sessions", // Get all use sessions
    getById: (sessionId) => `/api/sessions/${sessionId}`, // Get session details with questions
    deleteById: (sessionId) => `/api/sessions/${sessionId}`, // Delete a session
  },

  questions: {
    add: "/api/questions/add", // Add more questions to a session
    pin: (questionId) => `/api/questions/${questionId}/pin`, // Pin or Unpin a question
    updateNote: (questionId) => `/api/questions/${questionId}/note`, // Update/Add a note to a question
  },

  ai: {
    generateQuestions: "/api/ai/generate-questions", // Generate interview questions and answers using Gemini
    generateExplanation: "/api/ai/generate-explanation", // Generate concept explanation using Gemini
  },
};
