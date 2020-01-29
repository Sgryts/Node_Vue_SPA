import {Router} from 'express';
import objectIdValidator from '../../middleware/objectId.validator';
import verifyToken from '../../middleware/verifyToken';
import trimmer from '../../middleware/whiteSpaceTrimmer';
import Controller from './photo.controller';

const photo: Router = Router();
const photoAdmin: Router = Router();

const controller = new Controller();

// Retrieve all Photos
photo.get('/', controller.findAll);

// Retrieve a Specific Photo
photo.get('/:id', objectIdValidator, controller.findOne);


/* ADMIN ONLY */

// Retrieve all Photos
photoAdmin.get('/', verifyToken, controller.findAll);

// Retrieve a Specific Photo
photoAdmin.get('/:id', verifyToken, objectIdValidator, controller.findOne);

// Create a Photo
photoAdmin.post('/', verifyToken, trimmer, controller.create);

// Update a User with Id
photoAdmin.put('/:id', verifyToken, objectIdValidator, trimmer, controller.update);

// Delete a User with Id
photoAdmin.delete('/:id', verifyToken, objectIdValidator, controller.remove);

export {photo, photoAdmin};