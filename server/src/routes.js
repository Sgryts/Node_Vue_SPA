const InputValidator = require('./utils/InputValidator')
const UserController = require('./controllers/UserController')
const GenreController = require('./controllers/GenreController')
const PhotoController = require('./controllers/PhotoController')

module.exports = (app) => {
  // ADMIN TODO: add validation methods to routes
  // user authentication
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
    // TODO: Validation
    GenreController.add)
  // TODO: Validation
  app.put('/admin/genres/:id',
    GenreController.update)
  app.delete('/admin/genres/:id',
    GenreController.destroy)
  // photos
  app.get('/admin/photos',
    PhotoController.all)
  app.get('/admin/photos/:id',
    PhotoController.show)
  // TODO: Validation
  app.post('/admin/photos',
    PhotoController.add)
  // TODO: Validation
  app.put('/admin/photos/:id',
    PhotoController.update)
  app.delete('/admin/photos/:id',
    PhotoController.destroy)
  // CLIENT -- show By Genres
  app.get('/photos',
    PhotoController.all)
  app.get('/photos/:id',
    PhotoController.show)
}

// TODO: Change to index,create,store,show,edit,update,destroy
