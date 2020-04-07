import { Router } from 'express';
import trimmer from '../../middleware/whiteSpaceTrimmer';
import Controller from './auth.controller';
import { apiLimiter1_10 } from '../../middleware/rateLimiter';

const user: Router = Router();
const controller = new Controller();

/* ADMIN ONLY */
// Sign In
user.post('/login', apiLimiter1_10, trimmer, controller.authenticate);

// Register New User
user.post('/register', apiLimiter1_10, trimmer, controller.register);

export default user;
