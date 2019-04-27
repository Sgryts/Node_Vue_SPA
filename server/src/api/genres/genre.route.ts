import {Router} from 'express';
import objectIdValidator from "../../helpers/objectId.validator";
import Controller from './genre.controller';

const genre: Router = Router();
const controller = new Controller();

// Retrieve all Genres
genre.get('/', controller.findAll);

// Retrieve a Specific Genre
genre.get('/:id', objectIdValidator, controller.findOne);

//Create a Genre
genre.post('/',controller.create);

// Update a Genre with Id
genre.put('/:id', objectIdValidator, controller.update);

// Delete a Genre with Id
genre.delete('/:id', objectIdValidator, controller.remove);

export default genre;
