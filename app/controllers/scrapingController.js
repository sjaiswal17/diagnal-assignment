import sendResponse from '../helpers/sendResponse'
import ScrapeData from '../services/scraping/scrapeData'

export default class ScrapingController {
  static async ScrapeData (req, res) {
    const scrapeDataResult = await ScrapeData.execute(req.body)
    sendResponse(scrapeDataResult, res)
  }
}
