import express from 'express'
import { getUsers, createUser, findUserById, findUserByEmail, register, login, forgotPassword } from '../controllers/userController.js'
import { userAuthenticated } from '../middlewares/authMiddleware.js'

const router = express.Router()

/**
 * @swagger
 * /allusers:
 *   get:
 *     summary: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get('/allusers', getUsers)

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user object.
 */
router.get('/user/:id', userAuthenticated, findUserById)

/**
 * @swagger
 * /user/email/{email}:
 *   get:
 *     summary: Retrieve a user by email
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user object.
 */
router.get('/user/email/:email', userAuthenticated, findUserByEmail)

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: The created user object.
 */
router.post('/user/create', userAuthenticated, createUser)

// Auth
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: The registered user object.
 */
router.post('/register', register)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The logged in user object.
 */
router.post('/login', login)

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Send a password reset email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: A confirmation message.
 */
router.post('/forgot-password', forgotPassword)

export default router