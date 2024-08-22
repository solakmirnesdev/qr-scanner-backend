import mongoose from 'mongoose'

const QrSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  qr: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const Qr = mongoose.model('Qr', QrSchema)

export default Qr