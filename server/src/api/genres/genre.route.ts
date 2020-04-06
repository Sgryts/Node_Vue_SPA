import { Router } from 'express';
import objectIdValidator from '../../middleware/objectId.validator';
import { apiLimiter15_900 } from '../../middleware/rateLimiter';
import trimmer from '../../middleware/whiteSpaceTrimmer';
import verifyToken from '../../middleware/verifyToken';
import Controller from './genre.controller';
// import rateLimit from 'express-rate-limit';
// import RateLimiter from '../../middleware/rateLimiter';

const genre: Router = Router();
const genreAdmin: Router = Router();
const controller = new Controller();
// const limit = 15 * 60 * 1000; // 15 minutes
// const max = 900; // 1 req per s
// const rateLimiter = new RateLimiter(limit, max);

// const apiLimiter15_900 = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 900, // 1req per s
//     message: 'Too many accounts created from this IP, please try again after 15 min'
// });

// Retrieve all Genres
genre.get('/', apiLimiter15_900, controller.findAll);

// Retrieve a Specific Genre
genre.get('/:id', objectIdValidator, controller.findOne);

/* ADMIN */

// Retrieve all Genres
genreAdmin.get('/', verifyToken, controller.findAll);

// Retrieve a Specific Photo By Genre
genreAdmin.get('/:id', verifyToken, objectIdValidator, controller.findOne);

// Create a Genre
genreAdmin.post('/', verifyToken, trimmer, controller.create);

// Update a Genre with Id
genreAdmin.put('/:id', verifyToken, objectIdValidator, trimmer, controller.update);

// Delete a Genre with Id
genreAdmin.delete('/:id', objectIdValidator, controller.remove);

export { genre, genreAdmin };
