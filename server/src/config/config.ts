import * as dotenv from 'dotenv';

dotenv.config();

const envVariable = (devVar: string, prodVar: string): string => process.env.NODE_ENV === process.env.DEV ? devVar : prodVar;


export default {
  NODE_ENV: process.env.DEV || process.env.PROD,
  PORT: envVariable(process.env.DEV_PORT, process.env.PROD_PORT), //process.env.DEV_PORT || '3000',
  HOST: process.env.HOST,
  INSECURE_PORT: process.env.INSECURE_PORT,
  SECURE_PORT: process.env.SECURE_PORT,

  DB_DIALECT: process.env.DB_DIALECT,
  DB_HOST: envVariable(process.env.DEV_DB_HOST, process.env.PROD_DB_HOST),
  DB_NAME: envVariable(process.env.DEV_DB_NAME, process.env.PROD_DB_NAME),
  DB_PASSWORD: envVariable(process.env.DEV_DB_PASSWORD, process.env.PROD_DB_PASSWORD),
  DB_PORT: envVariable(process.env.DEV_DB_PORT, process.env.PROD_DB_PORT),
  DB_USER: envVariable(process.env.DEV_DB_USER, process.env.PROD_DB_USER),

  REDIS_HOST: envVariable(process.env.DEV_REDIS_HOST, process.env.PROD_REDIS_HOST),
  REDIS_PORT: envVariable(process.env.DEV_REDIS_PORT, process.env.PROD_REDIS_PORT),
  REDIS_PASSWORD: envVariable(process.env.DEV_REDIS_PASSWORD, process.env.PROD_REDIS_PASSWORD),

  JWT_ENCRYPTION: envVariable(process.env.DEV_JWT_ENCRYPTION, process.env.PROD_JWT_ENCRYPTION),
  JWT_EXPIRATION: envVariable(process.env.DEV_JWT_EXPIRATION, process.env.PROD_JWT_EXPIRATION),
  SALT_ROUNDS: envVariable(process.env.DEV_SALT_ROUNDS, process.env.PROD_SALT_ROUNDS),
  SESSION_ENCRYPTION: envVariable(process.env.DEV_SESSION_ENCRYPTION, process.env.PROD_SESSION_ENCRYPTION),
  RESPONSE_DELAY_MS: envVariable(process.env.DEV_RESPONSE_DELAY_MS, process.env.PROD_RESPONSE_DELAY_MS),

  SITE_KEY: envVariable(process.env.DEV_SITE_KEY, process.env.PROD_SITE_KEY),
  SECRET_KEY: envVariable(process.env.DEV_SECRET_KEY, process.env.PROD_SECRET_KEY),

  SMTP_PORT: envVariable(process.env.DEV_SMTP_PORT, process.env.PROD_SMTP_PORT),
  SMTP_HOST: envVariable(process.env.DEV_SMTP_HOST, process.env.PROD_SMTP_HOST),
  SMTP_USERNAME: envVariable(process.env.DEV_SMTP_USERNAME, process.env.PROD_SMTP_USERNAME),
  SMTP_PASSWORD: envVariable(process.env.DEV_SMTP_PASSWORD, process.env.PROD_SMTP_PASSWORD),
  ADMIN_SMTP_EMAIL: process.env.ADMIN_SMTP_EMAIL
};
