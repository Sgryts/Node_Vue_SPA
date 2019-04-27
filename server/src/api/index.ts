import {Router} from 'express';
import auth from './auth/auth.route';
import users from './users/user.route';
import genres from './genres/genre.route';
import photos from './photos/photo.route';
import contact from './contact/contact.route';

const router: Router = Router();
//TODO: public/admin routes
router.use('/', auth);
router.use('/users', users);
router.use('/genres', genres);
router.use('/photos', photos);
router.use('/contact',contact)

export default router;
