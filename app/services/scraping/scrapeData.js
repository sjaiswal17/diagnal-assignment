import ServiceBase from '../base'
import axios from 'axios'
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
    const response = await axios.get(this.url)
    const ogTagExtractorResult = await OgTagExtractor.execute({ ...this.args, doc: response.data })
    if (ogTagExtractorResult.successful) {
      return ogTagExtractorResult.result
    } else {
      this.mergeErrors(ogTagExtractorResult.errors)
    }
  }
}
