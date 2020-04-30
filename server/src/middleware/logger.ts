import { Logger, createLogger, format, transports, LoggerOptions, config } from 'winston';
// levels: config.npm.levels,

const options: LoggerOptions = {
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
};

const logger: Logger = createLogger(options);

export default logger;
