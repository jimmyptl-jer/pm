// server.ts
import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db'
import quizRoutes from './routes/quizRoutes'

dotenv.config()

// Connect to MongoDB
connectDB()

const app = express()

// Middleware
app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:5173'] // Adjust based on your frontend URL
  })
)

// Routes
app.use('/api/quiz', quizRoutes)

// Health Check
app.get('/health', async (req: Request, res: Response) => {
  res.send({ message: 'Server is running' })
})

app.listen(7000, () => {
  console.log('Server running on port 7000')
})
