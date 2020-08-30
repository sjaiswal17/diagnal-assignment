import ServiceBase from '../base'
import cheerio from 'cheerio'

const constraints = {
  doc: {
    type: 'string',
    presence: true
  },
  ogTags: {
    presence: true
  }
}

export default class NormalTagExtractor extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const $ = cheerio.load(this.doc)
      const tags = Object.keys(this.args.ogTags).length ? this.args.ogTags : {}

      if (!tags.title && $('title').text() && $('title').text().length > 0) {
        tags.title = $('title').text()
      }

      if (!tags.description && $('head > meta[name="description"]').attr('content') && $('head > meta[name="description"]').attr('content').length > 0) {
        tags.ogDescription = $('head > meta[name="description"]').attr('content')
      }

      if (!tags.image) {
        const images = []
        $('img[src]').map((_, imageElement) => {
          if (imageElement.attr('src').length > 0) {
            const sourceUrl = $(imageElement).attr('src')
            images.push(sourceUrl)
          }
          return false
        })

        tags.image = images.length ? images : tags.image
      }

      if (!tags.ogLocale) {
        if ($('html').attr('lang') && $('html').attr('lang').length > 0) {
          tags.ogLocale = $('html').attr('lang')
        } else if ($('head > meta[name="language"]').attr('content') && $('head > meta[name="language"]').attr('content').length > 0) {
          tags.ogLocale = $('head > meta[name="language"]').attr('content')
        }
      }

      return tags
    } catch (error) {
      this.log(error)
      return {}
    }
  }
}
