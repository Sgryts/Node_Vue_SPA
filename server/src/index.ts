import { config, Logger } from 'winston';
import app from './App';
import CONFIG from './config/config';
import './config/db';
import * as colors from 'colors';
import * as open from 'open';
import * as https from 'https';
import * as fs from 'fs';
import * as cluster from 'cluster';
import * as os from 'os';

const redisClient = require('./middleware/redis');
const logger: Logger = require('./middleware/logger');

const PORT = CONFIG.PORT;
const INSECURE_PORT = CONFIG.INSECURE_PORT;
const SECURE_PORT = CONFIG.SECURE_PORT;
const HOST = CONFIG.HOST;
// const options: { [key: string]: Buffer } = {
//   key: fs.readFileSync('src/cert/server.key'),
//   cert: fs.readFileSync('src/cert/server.crt')
// };

if (cluster.isMaster && CONFIG.NODE_ENV === 'production') {
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }

    cluster.on('online', worker => console.log(colors.rainbow(`Worker ${worker.process.pid} is online`)));
    cluster.on('exit', (worker, code, signal) => {
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            console.log(colors.red(`Worker ${worker.process.pid} crashed. Starting a new worker`));
            cluster.fork();
        }
    });
    process.on('SIGUSR2', () => {
        const workers = Object.values(cluster.workers);
        const restartWorker = (workerIndex: number) => {
            const worker = workers[workerIndex];
            if (!worker) return;
            worker.on('exit', () => {
                if (!worker.exitedAfterDisconnect) return;
                cluster.fork();
            });
            worker.disconnect();
        }
        restartWorker(0);
    });

} else {
    app.listen(PORT, () => {
        // redisClient.connect();
        console.log(colors.yellow.bold.bgCyan.underline(`Server is listening on ${PORT}`));
        // https.createServer(options, app).listen(SECURE_PORT);
    });

    // process.on('SIGINT', () => {
    //   redisClient.close();
    // })
}







