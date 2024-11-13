export default class FolderController {
    constructor(folderService) {
        this.folderService = folderService
    }
    async register(req, res, next) {
        try {
            const { name, customerId, eventId } = req.body
            const folder = await this.folderService.create({
                name,
                customerId,
                eventId,
                userId: req.auth.sub,
            })
            res.status(201).json({
                id: folder._id,
                name: folder.name,
                customerId: folder.customerId,
            })
        } catch (error) {
            return next()
        }
    }
    async findAll(req, res, next) {
        const { id } = req.params
        try {
            const folders = await this.folderService.findAll(id, req.auth.sub)
            res.status(200).json(folders)
        } catch (error) {
            return next()
        }
    }
    async remove(req, res, next) {
        try {
            const folders = await this.folderService.removeFolder(
                req.body.id,
                req.auth.sub,
            )
            res.status(200).json(folders)
        } catch (error) {
            return next()
        }
    }
}
