import * as fs from 'fs';
import * as winston from 'winston';
import * as rotate from 'winston-daily-rotate-file';
import Config from '../config/config.dev';

const dir = Config.logFileDir;
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      colorize: true
    }),
    new winston.transports.DailyRotateFile({
      filename: Config.logFileName,
      dirname: Config.logFileDir,
      maxsize: 20971520, // 20MB
      maxFiles: 25,
      datePattern: '.dd-MM-yyyy'
    })
  ]
});

export default logger;
