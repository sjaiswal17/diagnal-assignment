import '../app/workers'
import config from '../config/app'
import * as express from './express'
import Log from './logger'

const start = () => {
  const port = config.get('port')

  const appStartMessage = () => {
    const env = process.env.NODE_ENV
    Log.debug('', { message: 'Initializing API' })
    Log.info('', { message: `Server Name : ${config.get('app.name')}` })
    Log.info('', { message: `Environment  : ${env || 'development'}` })
    Log.info('', { message: `App Port : ${port}` })
    Log.info('', { message: `Process Id : ${process.pid}` })
  }

  const app = express.init()
  app.listen(port, appStartMessage)
}

export default start
