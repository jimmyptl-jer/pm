// routes/quizRoutes.ts
import express from 'express'
import {
  getRandomQuiz,
  submitAnswers,
  addQuizQuestions
} from '../controllers/quizController'

const router = express.Router()

// Get a random quiz (returns random questions)
router.get('/', getRandomQuiz)

router.post('/', addQuizQuestions)

// Submit answers and validate them
router.post('/submit', submitAnswers)

export default router
