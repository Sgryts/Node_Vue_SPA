import {Router} from 'express';
import verifyToken from '../../helpers/verifyToken';
import Controller from './user.controller';
import objectIdValidator from "../../helpers/objectId.validator";

const user: Router = Router();
const controller = new Controller();

// Retrieve all Users
user.get('/', controller.findAll);

// Retrieve a Specific User
user.get('/:id', objectIdValidator, verifyToken, controller.findOne);

// Update a User with Id
user.put('/:id', objectIdValidator, controller.update);

// Delete a User with Id
user.delete('/:id', objectIdValidator, controller.remove);

export default user;
