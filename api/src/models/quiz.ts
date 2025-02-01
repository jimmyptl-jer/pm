// // models/quizModel.ts
// import mongoose, { Document, Schema } from 'mongoose'

// interface Option {
//   option: string
//   isCorrect: boolean
// }

// interface Question {
//   question: string
//   options: Option[]
//   correctAnswer: Option // Updated to reference Option instead of string
// }

// interface Quiz extends Document {
//   title: string
//   questions: Question[]
// }

// const optionSchema = new Schema<Option>({
//   option: { type: String, required: true },
//   isCorrect: { type: Boolean, required: true }
// })

// const questionSchema = new Schema<Question>({
//   question: { type: String, required: true },
//   options: { type: [optionSchema], required: true },
//   correctAnswer: { type: optionSchema, required: true } // Updated to reference Option schema
// })

// const quizSchema = new Schema<Quiz>({
//   title: { type: String, required: true },
//   questions: { type: [questionSchema], required: true }
// })

// const QuizModel = mongoose.model<Quiz>('Quiz', quizSchema)

// export default QuizModel
