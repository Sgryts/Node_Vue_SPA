const InputValidator = require('./services/InputValidationService')
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
  // admin
  app.get('/admin'
  // load home page with all analytics
  )
  // genres
  app.get('/admin/genres',
    GenreController.index)
  app.get('/admin/genres/:id',
    GenreController.show)
  app.post('/admin/genres',
    // TODO: Validation
    GenreController.post)
  // TODO: Validation
  app.put('/admin/genres/:id',
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
    PhotoController.post)
  // TODO: Validation
  app.put('/admin/photos/:id',
    PhotoController.put)
  app.delete('/admin/photos/:id',
    PhotoController.destroy)
  // CLIENT -- show By Genres
  app.get('/photos',
    PhotoController.index)
  app.get('/photos/:id',
    PhotoController.show)
}

// TODO: Change to index,create,store,show,edit,update,destroy
// TODO: Analitics - photos, views per photo, visitors, etc ..
