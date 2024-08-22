import request from 'supertest'
import app from '../../server.js'
import User from '../../models/User.js'
import * as dbService from '../../services/dbService.js'
import bcrypt from 'bcryptjs'

jest.mock('../../services/dbService.js')

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should register a new user', async () => {
    const mockUser = { email: 'test@test.com', password: 'password', firstName: 'Test', lastName: 'User' }
    dbService.findOne.mockResolvedValue(null)
    dbService.create.mockResolvedValue(mockUser)

    const res = await request(app)
      .post('/register')
      .send(mockUser)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('email', mockUser.email)
  })

  it('should not register a user with the same email', async () => {
    const mockUser = { email: 'test@test.com', password: 'password', firstName: 'Test', lastName: 'User' }
    dbService.findOne.mockResolvedValue(mockUser)

    const res = await request(app)
      .post('/register')
      .send(mockUser)

    expect(res.statusCode).toEqual(400)
  })

  it('should login a user', async () => {
    const mockUser = { email: 'test@test.com', password: 'password', firstName: 'Test', lastName: 'User' }
    dbService.findOne.mockResolvedValue({
      ...mockUser,
      password: await bcrypt.hash('password', 10)
    })

    const res = await request(app)
      .post('/login')
      .send({
        email: 'test@test.com',
        password: 'password'
      })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('result')
    expect(res.body).toHaveProperty('token')
  })
})