import getOgTagsList from '../helpers/getOgTagsList'
import sendResponse from '../helpers/sendResponse'
import ScrapeData from '../services/scraping/scrapeData'

const tagList = getOgTagsList()

export default class ScrapingController {
  static async ScrapeData (req, res) {
    const scrapeDataResult = await ScrapeData.execute({ ...req.body, tagList }, { cache: true })
    sendResponse(scrapeDataResult, res)
  }
}
