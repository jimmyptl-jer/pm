import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose, { Document, Schema } from 'mongoose'
import connectDB from './config/db'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Connect to MongoDB
connectDB()

// Define the Quiz Schema
interface IQuestion extends Document {
  question: string
  options: string[]
  correctAnswer: string
}

const QuestionSchema = new Schema<IQuestion>({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true }
})

const Question = mongoose.model<IQuestion>('Question', QuestionSchema)

// API to fetch quiz questions
app.get('/api/questions', async (req: Request, res: Response) => {
  try {
    const questions = await Question.aggregate([{ $sample: { size: 10 } }]) // Fetch 10 random questions
    res.json(questions)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions' })
  }
})

// API to add a new question
app.post(
  '/api/questions',
  async (req: Request, res: Response): Promise<void> => {
    const { question, options, correctAnswer }: IQuestion = req.body

    // Ensure all fields are provided
    if (!question || !options || !correctAnswer) {
      res.status(400).json({ message: 'All fields are required' })
      return
    }

    try {
      // Create a new question document
      const newQuestion = new Question({
        question,
        options,
        correctAnswer
      })

      // Save the new question to the database
      await newQuestion.save()

      res
        .status(201)
        .json({ message: 'Question added successfully', question: newQuestion })
    } catch (error) {
      res.status(500).json({ message: 'Error adding question' })
    }
  }
)

// API to submit answers and calculate score
interface ISubmitAnswers {
  answers: string[]
}

app.post('/api/submit', async (req: Request, res: Response) => {
  const { answers }: ISubmitAnswers = req.body
  let score = 0

  try {
    const questions = await Question.find()
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        score++
      }
    })

    res.json({ score, total: questions.length })
  } catch (error) {
    res.status(500).json({ message: 'Error processing answers' })
  }
})

const PORT = process.env.PORT || 7000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
