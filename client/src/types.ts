// types.ts

// Define the structure for the individual quiz question
export interface Question {
  _id: string
  question: string
  options: string[]
  correctAnswer: string
}

// Define the structure for answers submitted by the user
export interface Answer {
  questionId: string // The ID of the question being answered
  selectedAnswer: string // The answer selected by the user
}

// Define the structure for the entire quiz
export interface Quiz {
  _id: string
  title: string
  questions: Question[] // Array of questions in the quiz
}

// Define the structure for the response returned after submitting answers
export interface SubmitAnswerResponse {
  score: number // The percentage score
  correctAnswers: number // Number of correct answers
  totalQuestions: number // Total number of questions in the quiz
}
