import {Router} from 'express';
import auth from './auth/auth.route';
import user from './users/user.route';
import {genre, genreAdmin} from './genres/genre.route';
import {photo, photoAdmin} from './photos/photo.route';
import contact from './contact/contact.route';

const router: Router = Router();

// CLIENT
router.use('/genres', genre);
router.use('/photos', photo);
router.use('/contact', contact);

// ADMIN
router.use('/', auth);
router.use('/admin/users', user);
router.use('/admin/genres', genreAdmin);
router.use('/admin/photos', photoAdmin);

export default router;
