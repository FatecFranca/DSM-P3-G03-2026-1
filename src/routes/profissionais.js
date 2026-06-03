import { Router } from 'express'
import controller from '../controllers/profissionais.js'

const router = Router()

router.post('/', controller.create)
router.get('/', controller.retrieveAll)
router.post('/login', controller.login)
router.get('/:id', controller.retrieveOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

export default router