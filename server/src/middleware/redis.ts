import * as redis from 'redis';
import * as colors from 'colors';
import { logger } from '../middleware/logger'
import CONFIG from '../config/config';

const redisClient = function () {

    let client = null;

    const connect = function () {
        if (client && client.connected) {
            return client;
        }

        const options = (CONFIG.REDIS_PASSWORD) ? {
            auth_pass: {
                host: CONFIG.REDIS_HOST,
                port: CONFIG.REDIS_PORT,
                password: CONFIG.REDIS_PASSWORD
            }
        } : {};

        client = redis.createClient(CONFIG.REDIS_PORT, CONFIG.REDIS_HOST, {});

        client.on('connect', function () {
            console.log(colors.bold.bgCyan.green(`Connected to Redis`));
        });

        client.on('error', function (err) {
            console.log(colors.bold.bgCyan.red(`Error with Redis: ${err}`));
            logger.error(err.message, err);
        });

        if (CONFIG.REDIS_PASSWORD) {
            // client.auth(CONFIG.REDIS_PASSWORD);
        }

        return client;
    },
        close = function () {
            client.quit();
        }

    return {
        connect: connect,
        close: close
    };

}();

module.exports = redisClient;

