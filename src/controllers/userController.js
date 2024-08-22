import User from '../models/User.js'
import * as dbService from '../services/dbService.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import sendEmail from '../utils/sendEmail.js'
import { handleBaseResponse } from '../services/apiResponsesService.js'

export const register = async (req, res) => {
  handleBaseResponse(res, async () => {
    const { email, password, firstName, lastName } = req.body

    const existingUser = await dbService.findOne(User, { email })

    if (existingUser) {
      throw new Error('User already exists...')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await dbService.create(User, { email, password: hashedPassword, firstName, lastName })

    return newUser
  }, 200, 400)
}

export const login = async (req, res) => {
  handleBaseResponse(res, async () => {
    const { email, password } = req.body

    const user = await dbService.findOne(User, { email })

    if (!user) {
      throw new Error('User not found...')
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      throw new Error('Invalid credentials')
    }

    const secretKey = process.env.JWT_SECRET
    const token = jwt.sign({ email: user.email, _id: user._id }, secretKey)

    return { result: user, token }
  }, 200, 400)
}

export const forgotPassword = async (req, res) => {
  handleBaseResponse(res, async () => {
    const { email } = req.body

    const user = await dbService.findOne(User, { email })

    if (!user) {
      throw new Error('User does not exist...')
    }

    const token = crypto.randomBytes(20).toString('hex')

    user.resetPasswordToken = token
    user.resetPasswordExpires = Date.now() + 3600000 // 1 hour

    await dbService.update(User, user._id, user)

    const resetURL = `http://${req.headers.host}/resetPassword?token=${token}`

    await sendEmail({
      to: user.email,
      subject: 'Password Reset',
      text: `Please go to this link to reset your password: ${resetURL}`
    })

    return { message:  'An email has been sent to reset your password.'}
  }, 200, 400)
}

export const getUsers = async (req, res) => {
  handleBaseResponse(res, async () => {
    const users = await dbService.getAll(User)
    return users
  }, 200, 500)
}

export const createUser = async (req, res) => {
  handleBaseResponse(res, async () => {
    const newUser = await dbService.create(User, req.body)
    return newUser
  }, 200, 400)
}

export const findUserById = async (req, res) => {
  handleBaseResponse(res, async () => {
    const user = await dbService.findById(User, req.params.id)
    if (!user) {
      throw new Error('User not found...')
    }
    return user
  }, 200, 404)
}

export const findUserByEmail = async (req, res) => {
  handleBaseResponse(res, async () => {
    const user = await dbService.findOne(User, { email: req.params.email })
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }, 200, 404)
}