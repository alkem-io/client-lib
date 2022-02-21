import * as winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'client-lib' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to the console
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

export enum LOG_LEVEL {
  INFO = 'info',
  ERROR = 'error',
  DEBUG = 'debug',
  WARN = 'warn',
  VERBOSE = 'verbose',
}

export function log(message: string, logLevel: LOG_LEVEL) {
  logger.log({ level: logLevel, message: message });
}
