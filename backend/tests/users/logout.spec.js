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

describe.skip('POST /auth/logout', () => {
    describe('-> given all fields', () => {
        it.skip('should return empty refresh and access token in the cookie', async () => {
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
            const logoutRes = await chai
                .request(app)
                .post('/auth/logout')
                .send()

            // Assert
            const cookies = logoutRes.headers['set-cookie'] || []
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
            expect(accessToken).null
            expect(refreshToken).null
        })
        it('should delete refresh token in the database', async () => {
            // Arrange
            const registerUser = {
                name: 'kevin',
                email: 'kevin@gmail.com',
                password: '12345678',
                studioname: 'photo',
            }
            // Act
            const agent = chai.request.agent(app)
            const registerRes = await agent
                .post('/auth/register')
                .send(registerUser)
                .then((res) => {
                    expect(res).to.have.cookie('refreshToken')
                    return agent.post('/auth/logout').then((res) => {
                        console.log(res)
                    })
                })
            // const cookies = registerRes.headers['set-cookie']
            // let refreshToken
            // cookies.forEach((cookie) => {
            //     if (cookie.startsWith('refreshToken=')) {
            //         refreshToken = cookie.split(';')[0]
            //     }
            // })
            // const logoutRes = await agent
            //     .post('/auth/logout')
            //     .send()
            // Assert
            // const refreshTokenData = await refreshTokenModel.find()
            // console.log(refreshToken)
            // expect(refreshToken).to.be.null
            // console.log(logoutRes.body)
            agent.close()
        })
    })
})
