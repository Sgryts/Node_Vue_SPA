import * as dotenv from 'dotenv';
import * as colors from 'colors';

dotenv.config({ path: `${process.cwd()}/.env.${process.env.NODE_ENV}` });
console.log(colors.magenta.bgWhite(`You are in ${process.env.NODE_ENV} environment`));

export default {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    INSECURE_PORT: process.env.INSECURE_PORT,
    SECURE_PORT: process.env.SECURE_PORT,

    DB_DIALECT: process.env.DB_DIALECT,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,

    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,

    JWT_ENCRYPTION: process.env.JWT_ENCRYPTION,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    SESSION_ENCRYPTION: process.env.SESSION_ENCRYPTION,
    RESPONSE_DELAY_MS: process.env.RESPONSE_DELAY_MS,

    SITE_KEY: process.env.SITE_KEY,
    SECRET_KEY: process.env.SECRET_KEY,

    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    ADMIN_SMTP_EMAIL: process.env.ADMIN_SMTP_EMAIL
};
