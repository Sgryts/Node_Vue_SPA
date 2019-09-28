import {Router} from 'express';
import objectIdValidator from "../../middleware/objectId.validator";
import verifyToken from '../../middleware/verifyToken';
import trimmer from "../../middleware/whiteSpaceTrimmer";
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
photo.get('/', controller.findAll);

// Retrieve a Specific Photo
photo.get('/:id', objectIdValidator, controller.findOne);

// Create a Photo
photo.post('/', trimmer, controller.create);

// Update a User with Id
photo.put('/:id', objectIdValidator, trimmer, controller.update);

// Delete a User with Id
photo.delete('/:id', objectIdValidator, controller.remove);

export {photo, photoAdmin};
