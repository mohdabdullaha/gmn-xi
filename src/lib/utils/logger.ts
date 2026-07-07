import winston from 'winston';
import { env } from '../env';

const { combine, timestamp, printf, colorize, json } = winston.format;

// ── Console Format (Development) ────────────────────────────
const devFormat = combine(
  colorize(),
  timestamp({ format: 'HH:mm:ss' }),
  printf(({ level, message, timestamp: ts, ...meta }) => {
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
    return `${ts} ${level}: ${message} ${metaStr}`;
  })
);

// ── JSON Format (Production) ────────────────────────────────
const prodFormat = combine(timestamp(), json());

export const logger = winston.createLogger({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: env.NODE_ENV === 'production' ? prodFormat : devFormat,
  defaultMeta: { service: 'gift-moral-nexus' },
  transports: [
    new winston.transports.Console(),
    // File transports only in development
    ...(env.NODE_ENV !== 'production'
      ? [
          new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
          }),
          new winston.transports.File({
            filename: 'logs/combined.log',
            maxsize: 5242880,
            maxFiles: 5,
          }),
        ]
      : []),
  ],
});
