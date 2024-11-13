import bcryptjs from 'bcryptjs'
export class CredentialService {
    async comparePassword(userPassword, hashedPassword) {
        return await bcryptjs.compare(userPassword, hashedPassword)
    }
}
