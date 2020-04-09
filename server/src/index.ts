import { inspect } from 'util';
import app from './App';
import CONFIG from './config/config';
import './config/db';
import * as colors from 'colors';
import * as open from 'open';
import * as https from 'https';
import * as fs from 'fs';

const logger = require('./middleware/logger');

const PORT: string = CONFIG.PORT;
const INSECURE_PORT = CONFIG.INSECURE_PORT;
const SECURE_PORT = CONFIG.SECURE_PORT;
const HOST: string = CONFIG.HOST;
const options: { [key: string]: Buffer } = {
  key: fs.readFileSync('src/cert/server.key'),
  cert: fs.readFileSync('src/cert/server.crt')
};

app.listen(PORT, (err: any) => {
  if (err) {
    logger.error(err.message, err);
    return console.log(colors.red(err));
  } else {
    // open(`http://${HOST}:${INSECURE_PORT}`);
    console.log(colors.yellow.bold.bgCyan.underline(`Server is listening on ${PORT}`));
  }
  // https.createServer(options, app).listen(SECURE_PORT);
});





