import { Router } from 'express'
import ToDoController from '../../../app/controllers/todo'

const router = Router()

router.get('/todos', ToDoController.GetAll)

export default router
