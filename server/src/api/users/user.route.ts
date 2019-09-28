import {Router} from 'express';
import verifyToken from '../../middleware/verifyToken';
import trimmer from '../../middleware/whiteSpaceTrimmer';
import Controller from './user.controller';
import objectIdValidator from '../../middleware/objectId.validator';

const user: Router = Router();
const controller = new Controller();

/* ADMIN ONLY */
// Retrieve all Users
user.get('/', verifyToken, controller.findAll);

// Retrieve a Specific User
user.get('/:id', verifyToken, objectIdValidator, verifyToken, controller.findOne);

// Update a User with Id
user.put('/:id', verifyToken, trimmer, objectIdValidator, controller.update);

// Delete a User with Id
user.delete('/:id', verifyToken, objectIdValidator, controller.remove);


export default user;
