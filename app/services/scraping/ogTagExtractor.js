import ServiceBase from '../base'
import cheerio from 'cheerio'
import NormalTagExtractor from './normalTagExtractor'

const constraints = {
  doc: {
    type: 'string',
    presence: true
  },
  tagList: {
    type: 'array',
    presence: true
  }
}

export default class OgTagExtractor extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const $ = cheerio.load(this.doc)
      const ogTags = {}
      const metaTags = $('meta')

      metaTags.each((_, meta) => {
        if (!meta.attribs || (!meta.attribs.property && !meta.attribs.name)) return

        const propertyName = meta.attribs.property || meta.attribs.name
        const propertyValue = meta.attribs.content || meta.attribs.value

        this.tagList.forEach((tag) => {
          if (propertyName.toLowerCase() === tag.property.toLowerCase()) {
            if (!ogTags[tag.keyName]) {
              ogTags[tag.keyName] = tag.group ? [propertyValue] : propertyValue
            } else if (Array.isArray(ogTags[tag.keyName])) {
              ogTags[tag.keyName].push(propertyValue)
            }
          }
        })
      })

      const normalTagExtractorResult = await NormalTagExtractor.execute({ ...this.args, ogTags })

      if (normalTagExtractorResult.successful) {
        return normalTagExtractorResult.result
      }

      return ogTags
    } catch (error) {
      this.log(error)
      return {}
    }
  }
}
