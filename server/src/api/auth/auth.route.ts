import { Router } from 'express';
import trimmer from '../../middleware/whiteSpaceTrimmer';
import Controller from './auth.controller';
import { apiRateLimiter } from '../../middleware/rateLimiter';

const user: Router = Router();
const controller = new Controller();

/* ADMIN ONLY */
user.post('/login', apiRateLimiter(1, 20), trimmer, controller.authenticate);

// Register New User
user.post('/register', apiRateLimiter(1, 20), trimmer, controller.register);

user.post('/refresh', apiRateLimiter(1, 20), trimmer, controller.refreshToken);

export default user;
