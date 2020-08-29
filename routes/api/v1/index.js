import { Router } from 'express'
import todoRoutes from './todo'

const NAMESPACE = '/v1'

const router = Router()

router.use(NAMESPACE, todoRoutes)

export default router
