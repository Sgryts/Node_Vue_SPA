import {Router} from 'express';
import Controller from './contact.controller';

const contact: Router = Router();
const controller = new Controller();

// Send email
contact.post('/recaptcha', controller.reCaptcha);
contact.post('/send', controller.sendEmail);

export default contact;
