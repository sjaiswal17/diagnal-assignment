import ScrapeData from '../../../../../app/services/scraping/scrapeData'
import getOgTagsList from '../../../../../app/helpers/getOgTagsList'
import appCache from '../../../../../lib/appCache'

describe('Services: scrapeData.spec: Scrape The Data', () => {
  it('should failed if validation failed', async () => {
    const result = await ScrapeData.execute()
    expect(result).toMatchSnapshot()
  })

  it('should cache result if context cache true', async () => {
    const result = await ScrapeData.execute({ tagList: getOgTagsList(), url: 'https:// www.imdb.com/title/tt0117500/' })

    expect(result).toMatchSnapshot()
    expect(appCache.has('https:// www.imdb.com/title/tt0117500/'))
  })
})
