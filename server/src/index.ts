import app from './App';
import CONFIG from './config/config';
import './config/db';
const logger = require('./middleware/logger');

const PORT = CONFIG.PORT;

app.listen(PORT, err => {
    if (err) {
        logger.error(err.message, err);
        return console.log(err);
    }
    console.log(`Server is listening on ${PORT}`);
});
