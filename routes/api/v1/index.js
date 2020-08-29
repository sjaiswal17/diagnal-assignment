import { Router } from 'express'
import scrapingRoutes from './scrapingRoutes'

const NAMESPACE = '/v1'

const router = Router()

router.use(NAMESPACE, scrapingRoutes)

export default router
