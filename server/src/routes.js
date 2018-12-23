const InputValidator = require('./services/InputValidationService')
const UserController = require('./controllers/UserController')
const GenreController = require('./controllers/GenreController')
const PhotoController = require('./controllers/PhotoController')
// const Authenticate = require('./services/AuthenticationService')

module.exports = (app) => {
  // ADMIN TODO: add validation methods to routes
  app.post('/admin/register',
    InputValidator.register,
    UserController.register)
  app.post('/admin/login',
    UserController.login)
  // admin
  // load home page with all analytics
  app.get('/admin')

  // genres
  app.get('/admin/genres',
    GenreController.index)
  app.get('/admin/genres/:id',
    GenreController.show)
  app.post('/admin/genres',
    // Authenticate,
    // TODO: Validation
    InputValidator.genres,
    GenreController.post)
  // TODO: Validation
  app.put('/admin/genres/:id',
    InputValidator.genres,
    GenreController.put)
  app.delete('/admin/genres/:id',
    GenreController.destroy)

  // photos
  app.get('/admin/photos',
    PhotoController.index)
  app.get('/admin/photos/:id',
    PhotoController.show)
  // TODO: Validation
  app.post('/admin/photos',
    // InputValidator.photos,
    PhotoController.post)
  // TODO: Validation
  app.put('/admin/photos/:id',
    // InputValidator.photos,
    PhotoController.put)
  app.delete('/admin/photos/:id',
    PhotoController.destroy)

  // CLIENT -- show By Genres
  app.get('/photos',
    PhotoController.index)
  app.get('/photos/:id',
    PhotoController.show)
}

// TODO: Analitics - photos, views per photo, visitors, etc ..
