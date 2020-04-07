import { inspect } from 'util';
import app from './App';
import CONFIG from './config/config';
import './config/db';
import * as colors from 'colors';

const logger = require('./middleware/logger');

const PORT = CONFIG.PORT;

app.listen(PORT, err => {
  if (err) {
    logger.error(err.message, err);
    return console.log(colors.red(err));
  }
  console.log(colors.yellow.bold.bgCyan(`Server is listening on ${PORT}`));
});
