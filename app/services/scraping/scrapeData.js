import ServiceBase from '../base'

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

  }
}
