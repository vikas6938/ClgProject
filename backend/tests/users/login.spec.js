import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src/app.js'
import mongoose from 'mongoose'
import connectDb from '../../src/config/dbConnection.js'
import refreshTokenModel from '../../src/models/refreshTokenModel.js'
import userModel from '../../src/models/userModel.js'
import { isJwt } from '../../src/utils/index.js'

chai.use(chaiHttp)
const expect = chai.expect

let connection
before(async () => {
    connection = await connectDb()
})

beforeEach(async () => {
    await userModel.deleteMany({})
    await refreshTokenModel.deleteMany({})
})

after(async () => {
    // await userModel.deleteMany({})
    mongoose.connection.close()
})

describe('POST /auth/login', () => {
    describe('-> given all fields', () => {
        it('should return 200 status code', async () => {
            // Arrange
            const registerUser = {
                name: 'kevin',
                email: 'kevin@gmail.com',
                password: '12345678',
                studioname: 'photo',
            }
            const loginUser = {
                email: 'kevin@gmail.com',
                password: '12345678',
            }
            // Act
            const registerRes = await chai
                .request(app)
                .post('/auth/register')
                .send(registerUser)
            const loginRes = await chai
                .request(app)
                .post('/auth/login')
                .send(loginUser)
            // Assert
            expect(loginRes).to.have.status(200)
        })
        it('should valid json response', async () => {
            // Arrange
            const userData = {
                email: 'kevin@gmail.com',
                password: '12345678',
            }
            // Act
            const response = await chai
                .request(app)
                .post('/auth/login')
                .send(userData)
            // Assert
            expect(response).to.be.json
        })
        it('should return 400 status code if email not exists in db', async () => {
            // Arrange
            const loginUser = {
                email: 'kevin@gmail.com',
                password: '12345678',
            }
            // Act
            const loginRes = await chai
                .request(app)
                .post('/auth/login')
                .send(loginUser)
            // Assert
            expect(loginRes).to.have.status(400)
            expect(loginRes.body).to.have.property('errors')
        })
        it('should return 400 status code if password not match in db', async () => {
            // Arrange
            const registerUser = {
                name: 'kevin',
                email: 'kevin@gmail.com',
                password: '12345678',
                studioname: 'photo',
            }
            const loginUser = {
                email: 'kevin@gmail.com',
                password: '123',
            }
            // Act
            const registerRes = await chai
                .request(app)
                .post('/auth/register')
                .send(registerUser)
            const loginRes = await chai
                .request(app)
                .post('/auth/login')
                .send(loginUser)
            // Assert
            expect(loginRes).to.have.status(400)
            expect(loginRes.body).to.have.property('errors')
        })
        it('should return the access token and refresh token inside a cookie', async () => {
            // Arrange
            const registerUser = {
                name: 'kevin',
                email: 'kevin@gmail.com',
                password: '12345678',
                studioname: 'photo',
            }
            const loginUser = {
                email: 'kevin@gmail.com',
                password: '12345678',
            }
            // Act
            const registerRes = await chai
                .request(app)
                .post('/auth/register')
                .send(registerUser)
            const loginRes = await chai
                .request(app)
                .post('/auth/login')
                .send(loginUser)
            // Assert
            const cookies = loginRes.headers['set-cookie'] || []
            let accessToken = null,
                refreshToken = null
            cookies.forEach((cookie) => {
                if (cookie.startsWith('accessToken=')) {
                    accessToken = cookie.split(';')[0].split('=')[1]
                }

                if (cookie.startsWith('refreshToken=')) {
                    refreshToken = cookie.split(';')[0].split('=')[1]
                }
            })
            expect(accessToken).not.null
            expect(refreshToken).not.null
            expect(isJwt(accessToken)).true
            expect(isJwt(refreshToken)).true
        })
    })

    describe('-> missing fields', () => {
        it('should return 400 status code if email is missing', async () => {
            // Arrange
            const userData = {
                email: '',
                password: '12345678',
            }
            // Act
            const response = await chai
                .request(app)
                .post('/auth/login')
                .send(userData)
            const tokens = await refreshTokenModel.find()
            // Assert
            expect(response.status).equal(400)
            expect(tokens).length(0)
        })
        it('should return 400 status code if password is missing', async () => {
            // Arrange
            const userData = {
                email: 'kevin@gmail.com',
                password: '',
            }
            // Act
            const response = await chai
                .request(app)
                .post('/auth/login')
                .send(userData)
            const tokens = await refreshTokenModel.find()
            // Assert
            expect(response.status).equal(400)
            expect(tokens).length(0)
        })
    })
})
