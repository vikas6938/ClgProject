import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src/app.js'
import mongoose from 'mongoose'
import customerModel from '../../src/models/customerModel.js'
import connectDb from '../../src/config/dbConnection.js'
import userModel from '../../src/models/userModel.js'
import refreshTokenModel from '../../src/models/refreshTokenModel.js'

chai.use(chaiHttp)
const expect = chai.expect

let connection
before(async () => {
    connection = await connectDb()
})

beforeEach(async () => {
    await userModel.deleteMany({})
    await refreshTokenModel.deleteMany({})
    await customerModel.deleteMany({})
})

after(async () => {
    mongoose.connection.close()
})

describe('POST /customer/register', () => {
    describe('-> Given all fields', () => {
        it('should return 201 status code', async () => {
            // Arrange
            const registerUser = {
                name: 'kevin',
                email: 'kevin@gmail.com',
                password: '12345678',
                studioname: 'photo',
            }
            const customerData = {
                name: 'customer1',
                mobile: '1234567898',
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

            // Act
            const response = await chai
                .request(app)
                .post('/customer/register')
                .set('Cookie', [`accessToken=${accessToken};`])
                .send(customerData)
            // Assert
            expect(response).status(201)
            expect(response).to.be.json
        })
        it('should persist the user in the database', async () => {
            // Arrange
            const registerUser = {
                name: 'kevin',
                email: 'kevin@gmail.com',
                password: '12345678',
                studioname: 'photo',
            }
            const customerData = {
                name: 'customer1',
                mobile: '1234567898',
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
                .post('/customer/register')
                .set('Cookie', [`accessToken=${accessToken};`])
                .send(customerData)
            const customers = await customerModel.find()
            // Assert
            expect(customers).length(1)
            expect(customers[0].name).equal(customerData.name)
            expect(customers[0].mobile).equal(customerData.mobile)
        })
    })
})
