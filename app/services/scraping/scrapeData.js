import axios from 'axios'
import appCache from '../../../lib/appCache'
import ServiceBase from '../base'
import OgTagExtractor from './ogTagExtractor'

const constraints = {
  url: {
    url: {
      schemes: ['http', 'https']
    },
    presence: true
  },
  tagList: {
    type: 'array',
    presence: true
  }
}

export default class ScrapeData extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const result = this.context.cache ? appCache.get(this.args.url) : undefined

    if (result === undefined) {
      const response = await axios.get(this.url)
      const ogTagExtractorResult = await OgTagExtractor.execute({ ...this.args, doc: response.data })
      if (ogTagExtractorResult.successful) {
        if (this.context.cache) {
          appCache.set(this.args.url, ogTagExtractorResult.result, 10000)
        }
        return ogTagExtractorResult.result
      } else {
        this.mergeErrors(ogTagExtractorResult.errors)
      }
    } else {
      return result
    }
  }
}
