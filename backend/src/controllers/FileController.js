import multer from 'multer'
import fs from 'fs'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { id } = req.params
        const uploadPath = `uploads/${id}`
        // Check if the directory exists
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true })
        }
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + '-' + file.originalname)
    },
})
const handleMultiPartData = multer({ storage }).array('logo')

export default class FileController {
    constructor(fileService) {
        this.fileService = fileService
    }
    async store(req, res, next) {
        // multipart form data
        handleMultiPartData(req, res, async (err) => {
            if (err) {
                return next(err)
            }
            // validation
            // const { error } = productSchema.validate(req.body)
            // if (error) {
            //     // if validation failed then delete uploaded file
            //     fs.unlink(`${appRoot}/${filePath}`, (err) => {
            //         if (err) {
            //             return next(CustomErrorHandler.serverError(err.message))
            //         }
            //     })
            //     return next(error)
            // }
            const { id } = req.params
            const reqFiles = req.files
            reqFiles.forEach((file) => {
                file.name = file.filename
                file.eventId = id
            })
            const files = await this.fileService.store(reqFiles)
            res.status(201).json({ files })
        })
    }
    async findAll(req, res) {
        // const folderId = req.params.folderid
        const eventId = req.params.eventid
        const files = await this.fileService.findAll(eventId)
        res.json({ data: files })
    }
    async update(req, res) {
        // const folderId = req.params.folderid
        const { fileid } = req.params
        const { selected } = req.query
        const data = {
            isSelected: selected,
        }
        const files = await this.fileService.update(fileid, data)
        res.json({ data: files })
    }
    async eventCompleted(req, res) {
        const { eventId } = req.params
        const { isCompleted } = req.body
        await this.fileService.eventCompleted(eventId, {
            $set: { isCompleted },
        })
        res.json({ msg: 'success' })
    }
}
