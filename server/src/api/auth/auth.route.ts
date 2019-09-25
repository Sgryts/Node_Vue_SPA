import {Router} from 'express';
import trimmer from "../../middleware/whiteSpaceTrimmer";
import Controller from './auth.controller';

const user: Router = Router();
const controller = new Controller();

/* ADMIN ONLY */
// Sign In
user.post('/login', trimmer, controller.authenticate);

// Register New User
user.post('/register', trimmer, controller.register);

export default user;
