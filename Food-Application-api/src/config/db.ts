// config/db.ts
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error in connecting to MongoDB`)
    process.exit(1) // Exit the process if connection fails
  }
}

export default connectDB
