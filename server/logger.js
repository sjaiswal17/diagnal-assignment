import winston from 'winston'
import fs from 'fs'
import config from '../config/app'

const { combine, timestamp, label, printf } = winston.format

const logDir = 'logs'

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const logLevel = config.get('log_level')

const transports = [
  new winston.transports.Console({
    level: logLevel,
    handleExceptions: true,
    json: true,
    colorize: true
  })
]

const customFormat = printf((info) => {
  let msg = `${info.timestamp} [${info.label}] ${info.level}: `
  msg += info.logTitle ? `${info.logTitle} Message: ${info.message} ` : info.message
  msg += info.class ? `class: ${typeof info.class === 'object' ? JSON.stringify(info.class) : info.class} ` : ''
  msg += info.context ? `context: ${typeof info.context === 'object' ? JSON.stringify(info.context) : info.context} ` : ''
  msg += info.metadata ? `metadata: ${typeof info.metadata === 'object' ? JSON.stringify(info.metadata) : info.metadata} ` : ''
  msg += info.tagsCtx ? `tagsCtx: ${typeof info.tagsCtx === 'object' ? JSON.stringify(info.tagsCtx) : info.tagsCtx} ` : ''
  msg += info.userCtx ? `userCtx: ${typeof info.userCtx === 'object' ? JSON.stringify(info.userCtx) : info.userCtx} ` : ''
  msg += info.exceptionBacktrace ? `exceptionBacktrace: ${typeof info.exceptionBacktrace === 'object' ? JSON.stringify(info.exceptionBacktrace) : info.exceptionBacktrace} ` : ''
  msg += info.fault ? `fault: ${typeof info.fault === 'object' ? JSON.stringify(info.fault) : info.fault} ` : ''
  return msg
})

const format = combine(
  winston.format.colorize(),
  label({ label: config.get('app.name') }),
  timestamp(),
  winston.format.prettyPrint(),
  customFormat
)

const logger = winston.createLogger({ transports: transports, exitOnError: false, format })

export default class Logger {
  static info (logTitle, argHash) {
    this.log('info', logTitle, argHash)
  }

  static debug (logTitle, argHash) {
    this.log('debug', logTitle, argHash)
  }

  static error (logTitle, argHash) {
    this.log('error', logTitle, argHash)
  }

  static log (logType, logTitle, argHash) {
    const allArgs = Object.assign({ logTitle }, argHash)
    const logMessage = this.buildMessage(allArgs)
    this.writeToLog(logType, logTitle, logMessage, argHash)
  }

  static writeToLog (logType, logTitle, logMessage, argHash) {
    if (argHash && ['start', 'around'].indexOf(argHash.wrap) !== -1) {
      logger[logType](this.generateWrapStr(logTitle, 'START'))
    } else if (argHash && ['end', 'around'].indexOf(argHash.wrap) !== -1) {
      logger[logType](this.generateWrapStr(logTitle, 'END'))
    } else {
      logger[logType](logMessage)
    }
  }

  static generateWrapStr (logTitle, separatorType) {
    return `${separatorType}${'='.repeat(15)}${logTitle.toUpperCase()}${'='.repeat(15)}${separatorType}`
  }

  static buildMessage (logAttrs) {
    const msg = { logTitle: logAttrs.logTitle }

    if (logAttrs.klass) { msg.class = logAttrs.klass.name }
    if (logAttrs.message) { msg.message = logAttrs.message }
    if (logAttrs.context) { msg.context = logAttrs.context }
    if (logAttrs.metadata) { msg.metadata = logAttrs.metadata }
    if (logAttrs.tagCtx) { msg.tagsCtx = logAttrs.tagCtx }
    if (logAttrs.userCtx) { msg.userCtx = logAttrs.userCtx }
    if (logAttrs.exception) { msg.exceptionBacktrace = logAttrs.exception.stack }
    if (logAttrs.fault) { msg.fault = logAttrs.fault }
    return msg
  }
}
