import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.DailyRotateFile({
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        }),
      ],
    });
  }

  log(context: string, message: string, metadata?: any) {
    this.logger.info(message, {
      context,
      ...metadata,
    });
  }

  error(context: string, message: string, trace?: string, metadata?: any) {
    this.logger.error(message, {
      context,
      trace,
      ...metadata,
    });
  }

  warn(context: string, message: string, metadata?: any) {
    this.logger.warn(message, {
      context,
      ...metadata,
    });
  }

  debug(context: string, message: string, metadata?: any) {
    this.logger.debug(message, {
      context,
      ...metadata,
    });
  }
}
