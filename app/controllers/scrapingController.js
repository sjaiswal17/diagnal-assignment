import sendResponse from '../helpers/sendResponse'
import ScrapeData from '../services/scraping/scrapeData'
import getOgTagsList from '../helpers/getOgTagsList'

export default class ScrapingController {
  static async ScrapeData (req, res) {
    const tagList = getOgTagsList()
    const scrapeDataResult = await ScrapeData.execute({ ...req.body, tagList })
    sendResponse(scrapeDataResult, res)
  }
}
