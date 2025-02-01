// controllers/quizController.ts
import { Request, Response } from 'express'
import Quiz from '../models/quiz'

// Existing getRandomQuiz controller
export const getRandomQuiz = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const quizzes = await Quiz.aggregate([{ $sample: { size: 10 } }]) // Random quiz selection
    if (!quizzes.length) {
      res.status(404).json({ message: 'No quizzes found' })
      return
    }
    const quiz = quizzes[0]
    res.json(quiz)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching quiz', error })
  }
}

// Existing submitAnswers controller
export const submitAnswers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { quizId, answers } = req.body

  try {
    const quiz = await Quiz.findById(quizId)
    if (!quiz) {
      res.status(404).json({ message: 'Quiz not found' })
      return
    }

    let score = 0
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += 1
      }
    })

    res.json({
      message: 'Quiz submitted',
      score,
      totalQuestions: quiz.questions.length
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error validating answers', error })
  }
}

// New controller to add quiz questions
export const addQuizQuestions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, questions } = req.body

  // Validate incoming data
  if (!title || !Array.isArray(questions) || questions.length === 0) {
    res.status(400).json({ message: 'Invalid input data' })
    return
  }

  try {
    // Create a new quiz with the given title and questions
    const newQuiz = new Quiz({
      title,
      questions
    })

    // Save the quiz to the database
    await newQuiz.save()

    res.status(201).json({
      message: 'Quiz created successfully',
      quiz: newQuiz
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error saving quiz', error })
  }
}
