import {Router} from 'express';
import auth from './auth/auth.route';
import users from './users/user.route';
import genres from './genres/genre.route';
import photos from './photos/photo.route';

const router: Router = Router();

router.use('/', auth);
router.use('/users', users);
router.use('/genres', genres);
router.use('/photos', photos);

export default router;
