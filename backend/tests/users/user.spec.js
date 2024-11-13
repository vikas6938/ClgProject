import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src/app.js'
import mongoose from 'mongoose'
import connectDb from '../../src/config/dbConnection.js'
import refreshTokenModel from '../../src/models/refreshTokenModel.js'
import userModel from '../../src/models/userModel.js'

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

describe('GET /auth/self', () => {
    describe('-> given all fields', () => {
        it('should return 200 status code', async () => {
            // Arrange
            const registerUser = {
                name: 'kevin',
                email: 'kevin@gmail.com',
                password: '12345678',
                studioname: 'photo',
            }
            // Act
            const registerRes = await chai
                .request(app)
                .post('/auth/register')
                .send(registerUser)

            const cookies = registerRes.headers['set-cookie'] || []
            let accessToken = null
            cookies.forEach((cookie) => {
                if (cookie.startsWith('accessToken=')) {
                    accessToken = cookie.split(';')[0].split('=')[1]
                }
            })
            const response = await chai
                .request(app)
                .get('/auth/self')
                .set('Cookie', [`accessToken=${accessToken};`])
                .send()
            // Assert
            expect(response).to.have.status(200)
        })
        it('should return the user data', async () => {
            // Arrange
            const registerUser = {
                name: 'kevin',
                email: 'kevin@gmail.com',
                password: '12345678',
                studioname: 'photo',
            }
            // Act
            const registerRes = await chai
                .request(app)
                .post('/auth/register')
                .send(registerUser)

            const cookies = registerRes.headers['set-cookie'] || []
            let accessToken = null
            cookies.forEach((cookie) => {
                if (cookie.startsWith('accessToken=')) {
                    accessToken = cookie.split(';')[0].split('=')[1]
                }
            })
            const response = await chai
                .request(app)
                .get('/auth/self')
                .set('Cookie', [`accessToken=${accessToken};`])
                .send()
            // Assert
            expect(response.body._id).equal(registerRes.body.id)
        })
        it('should return the password field', async () => {
            // Arrange
            const registerUser = {
                name: 'kevin',
                email: 'kevin@gmail.com',
                password: '12345678',
                studioname: 'photo',
            }
            // Act
            const registerRes = await chai
                .request(app)
                .post('/auth/register')
                .send(registerUser)

            const cookies = registerRes.headers['set-cookie'] || []
            let accessToken = null
            cookies.forEach((cookie) => {
                if (cookie.startsWith('accessToken=')) {
                    accessToken = cookie.split(';')[0].split('=')[1]
                }
            })
            const response = await chai
                .request(app)
                .get('/auth/self')
                .set('Cookie', [`accessToken=${accessToken};`])
                .send()
            // Assert
            expect(response.body).not.have.property('password')
        })
    })
})
