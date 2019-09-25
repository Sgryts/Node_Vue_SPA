import {Router} from 'express';
import objectIdValidator from "../../middleware/objectId.validator";
import verifyToken from '../../middleware/verifyToken';
import trimmer from "../../middleware/whiteSpaceTrimmer";
import Controller from './photo.controller';

const photo: Router = Router();
const controller = new Controller();

// Retrieve all Photos
photo.get('/', controller.findAll);
photo.get('/admin', controller.findAll);

// Retrieve a Specific Photo
photo.get('/:id', objectIdValidator, controller.findOne);
photo.get('/admin/:id', objectIdValidator, controller.findOne);

/* ADMIN ONLY */
// Create a Photo
photo.post('/admin', trimmer, controller.create);

// Update a User with Id
photo.put('/admin/:id', objectIdValidator, trimmer, controller.update);

// Delete a User with Id
photo.delete('/admin/:id', objectIdValidator, controller.remove);

export default photo;
