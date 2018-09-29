const InputValidator = require('./utils/InputValidator')
const UserController = require('./controllers/UserController')
const GenreController = require('./controllers/GenreController')
// const PhotoController = require('./controllers/PhotoController')

module.exports = (app) => {
  // authentication
  app.post('/admin/register',
    InputValidator.register,
    UserController.register)
  app.post('/admin/login',
    UserController.login)
  // genres
  app.get('/admin/genres',
    GenreController.all)
  app.get('/admin/genres/:id',
    GenreController.show)
  app.post('/admin/genres',
    GenreController.add)
  app.put('/admin/genres/:id',
    GenreController.update)
  app.delete('/admin/genres/:id',
    GenreController.destroy)
  // photos
  // app.get('/admin/photos',
  //   PhotoController.photos_show)
  // app.post('/admin/photo/add',
  //   PhotoController.photos_add)
  // app.put('/admin/photo/:id',
  //   PhotoController.photos_update)
  // app.delete('/admin/photo/:id',
  //   PhotoController.photos)
}
