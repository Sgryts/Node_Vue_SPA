import * as dotenv from 'dotenv';

dotenv.config();

export default {
  NODE_ENV: process.env.DEV_NODE_ENV || 'development',
  PORT: process.env.DEV_PORT || '3000',
  HOST: process.env.HOST,
  INSECURE_PORT: process.env.INSECURE_PORT,
  SECURE_PORT: process.env.SECURE_PORT,

  DB_DIALECT: process.env.DEV_DB_DIALECT || 'mongo',
  DB_HOST: process.env.DEV_DB_HOST || 'mongodb://localhost:27017/example_db',
  DB_NAME: process.env.DEV_DB_NAME || 'example_db',
  DB_PASSWORD: process.env.DEV_DB_PASSWORD || 'db-password',
  DB_PORT: process.env.DEV_DB_PORT || '27017',
  DB_USER: process.env.DEV_DB_USER || 'root',

  JWT_ENCRYPTION: process.env.JWT_ENCRYPTION || 'jwt_please_change',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
  SESSION_ENCRYPTION: process.env.SESSION_ENCRYPTION || 'session_please_change',
  RESPONSE_DELAY_MS: process.env.RESPONSE_DELAY_MS || 5000,

  DEV_SITE_KEY: process.env.DEV_SITE_KEY_DEV,
  DEV_SECRET_KEY: process.env.DEV_SECRET_KEY,
  SITE_KEY: process.env.SITE_KEY,
  SECRET_KEY: process.env.SECRET_KEY,

  DEV_SMTP_PORT: process.env.DEV_SMTP_PORT,
  DEV_SMTP_HOST: process.env.DEV_SMTP_HOST,
  DEV_SMTP_USERNAME: process.env.DEV_SMTP_USERNAME,
  DEV_SMTP_PASSWORD: process.env.DEV_SMTP_PASSWORD,
  ADMIN_SMTP_EMAIL: process.env.ADMIN_SMTP_EMAIL
};
