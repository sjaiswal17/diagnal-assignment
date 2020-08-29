import { Router } from 'express'
import expressListRoutes from 'express-list-routes'
import v1Routes from './v1'

const router = Router()

router.use('/api', v1Routes)

expressListRoutes({ prefix: '/api/v1' }, 'API:', router)

export default router
