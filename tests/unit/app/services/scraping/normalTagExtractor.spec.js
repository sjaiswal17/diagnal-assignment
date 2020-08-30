import NormalTagExtractor from '../../../../../app/services/scraping/normalTagExtractor'

describe('Services: normalTagExtractor: Normal Tag Extractor', () => {
  it('should failed if validation failed', async () => {
    const result = await NormalTagExtractor.execute()
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
        <img width="360" src="test.png" alt="test">
        <img width="360" alt="test2">
      </body>
    </html>
  `
    const result = await NormalTagExtractor.execute({ doc, ogTags: {} })
    expect(result).toMatchSnapshot()
  })

  it('should add title and description and image if not present', async () => {
    const doc = `
    <html>
      <head>
        <meta charset="utf-8">
        <title>Main</title>
        <meta name='description' content='150 words'>
      </head>
      <body>
        <h1>hello test page</h1>
        <img width="360" src="test.png" alt="test">
        <img width="360" alt="test2">
      </body>
    </html>
  `
    const result = await NormalTagExtractor.execute({ doc, ogTags: {} })
    expect(result).toMatchSnapshot()
  })
})
