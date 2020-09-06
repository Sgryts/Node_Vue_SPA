import {Router} from 'express';
import trimmer from '../../middleware/whiteSpaceTrimmer';
import Controller from './contact.controller';

const contact: Router = Router();
const controller = new Controller();

// Send email
contact.post('/', trimmer, controller.sendEmail);

export default contact;
