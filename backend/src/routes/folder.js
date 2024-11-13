import express from 'express'
import { FolderService } from '../services/FolderService.js'
import FolderController from '../controllers/FolderController.js'
import authenticate from '../middlewares/authenticate.js'
const router = express.Router()

const folderService = new FolderService()
const folderController = new FolderController(folderService)

router.post('/register', authenticate, (req, res, next) =>
    folderController.register(req, res, next),
)

router.get('/:id', authenticate, (req, res, next) =>
    folderController.findAll(req, res, next),
)

router.delete('/', authenticate, (req, res, next) => {
    folderController.remove(req, res, next)
})

export default router
