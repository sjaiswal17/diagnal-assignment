import axios from 'axios'
import NodeCache from 'node-cache'
import ServiceBase from '../base'
import OgTagExtractor from './ogTagExtractor'

const myCache = new NodeCache()

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
    const result = this.context.cache ? myCache.get(this.args.url) : undefined

    if (result === undefined) {
      const response = await axios.get(this.url)
      const ogTagExtractorResult = await OgTagExtractor.execute({ ...this.args, doc: response.data })
      if (ogTagExtractorResult.successful) {
        if (this.context.cache) {
          myCache.set(this.args.url, ogTagExtractorResult.result, 10000)
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
