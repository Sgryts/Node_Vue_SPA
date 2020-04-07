import * as mongoose from 'mongoose';
import * as colors from 'colors';
import CONFIG from './config';
import logger from '../middleware/logger'

mongoose.set('useCreateIndex', true);

// Connecting to the database
export default (async () => {
  try {
    await mongoose.connect(
      CONFIG.DB_HOST,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    );
    console.log(colors.green('The Connection is Successful'));
  } catch (err) {
    logger.error(err.message, err);
    console.log(colors.red(`${err} Could not Connect to the Database. Exiting Now...`));
    process.exit();
  }
})();
