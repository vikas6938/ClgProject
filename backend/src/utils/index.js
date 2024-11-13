export const isJwt = (token) => {
    const parts = token.split('.')
    if (parts.length !== 3) {
        return false
    }
    try {
        parts.forEach((part) => {
            Buffer.from(part, 'base64').toString('utf-8') // to check string is valid base64 or not by converting to string
        })
        return true
    } catch (error) {
        return false
    }
}
