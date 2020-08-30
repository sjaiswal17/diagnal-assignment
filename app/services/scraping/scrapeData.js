import ServiceBase from '../base'
import axios from 'axios'
import TagExtractor from './tagExtractor'

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
    const tagExtractorResult = await TagExtractor.execute({ ...this.args, doc: response.data })
    if (tagExtractorResult.successful) {
      return tagExtractorResult.result
    } else {
      this.addError('tagExtractorResult', 'Web server is returning error')
    }
  }
}
