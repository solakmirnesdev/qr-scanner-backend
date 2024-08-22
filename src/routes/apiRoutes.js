import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from '../config/swagger.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()

// Serve Swagger docs on '/' route
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Get all route files
const routeFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('Routes.js'))

// Import and use each route
for (const file of routeFiles) {
  if (file === 'apiRoutes.js') continue // Skip the apiRoutes file itself
  const route = await import(path.join(__dirname, file))
  router.use('/api', route.default)
}

export default router