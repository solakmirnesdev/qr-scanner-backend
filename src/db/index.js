import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const url = process.env.MONGODB_CLUSTER_URI

const connectDB = async () => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Database succesfully connected...')
  } catch (error) {
    console.error('Failed to connect to database: ', error)
  }
}

export { connectDB }