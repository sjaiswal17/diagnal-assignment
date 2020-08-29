const convict = require('convict')

const config = convict({
  app: {
    name: {
      doc: 'Name of the service',
      format: String,
      default: 'Your service name'
    }
  },
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 12345,
    env: 'PORT'
  },
  log_level: {
    doc: 'level of logs to show',
    format: String,
    default: 'debug',
    env: 'LOG_LEVEL'
  }
})

config.validate({ allowed: 'strict' })

module.exports = config
