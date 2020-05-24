import { Logger, createLogger, format, transports, LoggerOptions, config } from 'winston';
import { logger as expressWinston } from 'express-winston';
// levels: config.npm.levels,

const options: LoggerOptions = {
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.json(),
    format.colorize(),
    format.prettyPrint()
  ),
  transports: [
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      handleExceptions: true, maxsize: 5242880
    }),
    new transports.File({ filename: 'logs/combined.log' })
  ],
  exitOnError: false
};

export const logger: Logger = createLogger(options);

export const expressWinstonLogger = expressWinston({
  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.json(),
        format.colorize(),
        format.prettyPrint()
      ),
      handleExceptions: true,
    })
  ],
});
export const expressWinstonErrorLogger = expressWinston({
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.json(),
        format.colorize(),
        format.prettyPrint()
      ),
      handleExceptions: true,
    }),
    new transports.File({
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.json(),
        format.colorize(),
        format.prettyPrint()
      ),
      filename: 'logs/error.log',
      level: 'error',
      handleExceptions: true,
      maxsize: 5242880,
    })
  ]
});
