import * as dotenv from 'dotenv';

dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || '3000',
  HOST: process.env.HOST,
  INSECURE_PORT: process.env.INSECURE_PORT,
  SECURE_PORT: process.env.SECURE_PORT,

  DB_DIALECT: process.env.DB_DIALECT || 'mongo',
  DB_HOST: process.env.DB_HOST || 'mongodb://localhost:27017/example_db',
  DB_NAME: process.env.DB_NAME || 'example_db',
  DB_PASSWORD: process.env.DB_PASSWORD || 'db-password',
  DB_PORT: process.env.DB_PORT || '27017',
  DB_USER: process.env.DB_USER || 'root',

  JWT_ENCRYPTION: process.env.JWT_ENCRYPTION || 'jwt_please_change',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
  SESSION_ENCRYPTION: process.env.SESSION_ENCRYPTION || 'session_please_change',
  RESPONSE_DELAY_MS: process.env.RESPONSE_DELAY_MS || 5000
};
