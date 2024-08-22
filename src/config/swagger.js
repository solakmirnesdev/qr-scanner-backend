import swaggerJsdoc from 'swagger-jsdoc'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'QRJet API with Swagger',
    version: '1.0.0'
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}/api`,
      description: 'Development server'
    },
  ],
}

const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: [path.join(__dirname, '../**/*Routes.js')]
}

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec