import cors from 'cors'

const corsOptions = {
  origin: [
    'http://localhost:9100',
    'https://www.qrjet.com'
  ],
  credentials: true
}

export default cors(corsOptions)
