import { Router } from 'express'
import ScrapingController from '../../../app/controllers/scrapingController'

const router = Router()

router.post('/scrapping', ScrapingController.ScrapeData)

export default router
