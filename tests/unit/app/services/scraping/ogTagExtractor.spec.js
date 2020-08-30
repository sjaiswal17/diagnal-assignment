import getOgTagsList from '../../../../../app/helpers/getOgTagsList'
import OgTagExtractor from '../../../../../app/services/scraping/ogTagExtractor'

describe('Services: ogTagExtractor.spec: Og Tag Extractor', () => {
  it('should failed if validation failed', async () => {
    const result = await OgTagExtractor.execute()
    expect(result).toMatchSnapshot()
  })

  it('should return result if validation passed', async () => {
    const doc = `
    <html>
      <head>
        <meta charset="utf-8">
        <meta property="og:description" content="test description">
        <meta property="og:title" content="test page">
      </head>
      <body>
        <h1>hello test page</h1>
      </body>
    </html>
  `
    const result = await OgTagExtractor.execute({ doc, tagList: getOgTagsList() })
    expect(result).toMatchSnapshot()
  })

  it('should return array of images', async () => {
    const doc = `
    <html>
      <head>
        <meta charset="utf-8">
        <meta property="og:description" content="test description">
        <meta property="og:title" content="test page">
        <meta property="og:image" content="test1.png">
        <meta property="og:image" content="test2.png">
      </head>
      <body>
        <h1>hello test page</h1>
      </body>
    </html>
  `
    const result = await OgTagExtractor.execute({ doc, tagList: getOgTagsList() })
    expect(result).toMatchSnapshot()
  })
})
