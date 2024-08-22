import jwt from 'jsonwebtoken'
import * as dbService from '../services/dbService.js'
import User from '../models/User.js' 

export const userAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Authentication token is required.' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await dbService.findById(User, decodedToken._id) 
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired authentication token.' })
  }
}