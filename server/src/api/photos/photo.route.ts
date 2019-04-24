import {Router} from 'express';
import objectIdValidator from "../../helpers/objectId.validator";
import verifyToken from '../../helpers/verifyToken';
import Controller from './photo.controller';

const photo: Router = Router();
const controller = new Controller();

// Retrieve all Photos
photo.get('/', controller.findAll);

// Retrieve all Photos by Genre
photo.get('/genre/:id', objectIdValidator, controller.findByGenre);

// Retrieve a Specific Photo
photo.get('/:id', objectIdValidator, controller.findOne);

// Create a Photo
photo.post('/',controller.create);

// Update a User with Id
photo.put('/:id', objectIdValidator, controller.update);

// Delete a User with Id
photo.delete('/:id', objectIdValidator, controller.remove);

export default photo;
