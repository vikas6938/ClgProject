export class CodeService {
    generateCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString()
    }
}
