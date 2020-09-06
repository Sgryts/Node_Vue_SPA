import { Router } from 'express';
import trimmer from '../../middleware/whiteSpaceTrimmer';
import Controller from './contact.controller';
import { apiRateLimiter } from '../../middleware/rateLimiter';

const contact: Router = Router();
const controller = new Controller();

// Send email
contact.post('/', apiRateLimiter(1, 10), trimmer, controller.sendEmail);

export default contact;
