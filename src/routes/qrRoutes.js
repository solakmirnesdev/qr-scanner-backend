import express from 'express'
import { generateQr, getUserQrs, getUserQrByName, getUserQrByUrl, deleteQr, updateQr } from '../controllers/qrController.js'
import { userAuthenticated } from '../middlewares/authMiddleware.js'

const router = express.Router()

/**
 * @swagger
 * /qr/generate:
 *   post:
 *     summary: Generate a new QR code
 *     responses:
 *       200:
 *         description: The generated QR code.
 */
router.post('/qr/generate', userAuthenticated, generateQr)

/**
 * @swagger
 * /all-qrs:
 *   get:
 *     summary: Retrieve all QR codes
 *     responses:
 *       200:
 *         description: A list of QR codes.
 */
router.get('/all-qrs', userAuthenticated, getUserQrs)

/**
 * @swagger
 * /qr/name/{name}:
 *   get:
 *     summary: Retrieve a QR code by name
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A QR code object.
 */
router.get('/qr/name/:name', userAuthenticated, getUserQrByName)

/**
 * @swagger
 * /qr/url/{url}:
 *   get:
 *     summary: Retrieve a QR code by URL
 *     parameters:
 *       - in: path
 *         name: url
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A QR code object.
 */
router.get('/qr/url/:url', userAuthenticated, getUserQrByUrl)

/**
 * @swagger
 * /qr/delete/{id}:
 *   delete:
 *     summary: Delete a QR code by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A confirmation message.
 */
router.delete('/qr/delete/:id', userAuthenticated, deleteQr)

/**
 * @swagger
 * /qr/update/{id}:
 *   put:
 *     summary: Update a QR code by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The updated QR code object.
 */
router.put('/qr/update/:id', userAuthenticated, updateQr)

export default router
