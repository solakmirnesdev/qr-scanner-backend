// QR 3rd party util
import QRCode from 'qrcode'

// Model
import Qr from '../models/Qr.js'

// Services
import * as dbService from '../services/dbService.js'
import { handleBaseResponse } from '../services/apiResponsesService.js'

export const generateQr = async (req, res) => {
  const { url, name } = req.body

  if (!url || !name) {
    return res.status(400).json({ message: 'Missing URL and/or name parameter.' });
  }

  handleBaseResponse(res, async () => {
    const qr = await QRCode.toDataURL(url)

    const newQr = {
      url,
      name,
      qr,
      userId: req.user._id
    }

    if (!newQr.userId) {
      throw new Error('User ID is required.')
    }

    await dbService.create(Qr, newQr)

    return { name, qr }
  }, 200, 500, 'Error generating QR code.')
}

export const getUserQrs = async (req, res) => {
  handleBaseResponse(res, async () => {
    const userQrs = await dbService.getAllByQuery(Qr, { userId: req.user._id })
    return userQrs
  }, 200, 500, 'Error retrieving QR codes...')
}

export const getUserQrByName = async (req, res) => {
  const { name } = req.params

  handleBaseResponse(res, async () => {
    const userQr = await dbService.findOne(Qr, { name: name, userId: req.user._id })

    if (!userQr) {
      throw new Error('QR code not found.')
    }

    return userQr
  }, 200, 404)
}

export const getUserQrByUrl = async (req, res) => {
  const { url } = req.params

  handleBaseResponse(res, async () => {
    const userQr = await dbService.findOne(Qr, { url: url, userId: req.user._id })

    if (!userQr) {
      throw new Error('QR code not found.')
    }

    return userQr
  }, 200, 404)
}

export const deleteQr = async (req, res) => {
  handleBaseResponse(res, async () => {
    const { id } = req.params

    const qr = await dbService.findById(Qr, id)

    if (!qr) {
      throw new Error('QR code not found.')
    }

    await dbService.remove(Qr, id)

    return { message: 'QR code deleted successfully' }
  }, 200, 404)
}

export const updateQr = async (req, res) => {
  const { id } = req.params
  const { url, name } = req.body

  if (!url || !name) {
    return res.status(400).json({ message: 'Missing URL and/or name parameter.' });
  }

  handleBaseResponse(res, async () => {
    const qr = await dbService.findById(Qr, id)

    if (!qr) {
      throw new Error('QR code not found.')
    }

    const updatedQr = {
      url,
      name,
      qr: await QRCode.toDataURL(url),
      userId: req.user._id
    }

    await dbService.update(Qr, id, updatedQr)

    return updatedQr
  }, 200, 500)
}