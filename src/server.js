import express from 'express'
import { connectDB } from './db/index.js'
import dotenv from 'dotenv'
import apiRoutes from './routes/apiRoutes.js'
import cors from './config/cors.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

app.use(cors)
app.use(express.json())
app.use(apiRoutes)

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}).catch(error => {
  console.error('Failed to connect to the DB ', error)
})

