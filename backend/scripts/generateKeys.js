import crypto from 'crypto'

const keyLength = 32

// Generate a random key
const key = crypto.randomBytes(keyLength)

console.log('Generated key:', key.toString('hex'))
