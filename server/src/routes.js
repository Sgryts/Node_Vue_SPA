const InputValidator = require('./utils/InputValidator')
const UserController = require('./src/scontrollers/UserController')
module.exports = (app) => {
  app.post('/admin/register',
    InputValidator.register,
    UserController.register)
  app.post('/admin/login',
    UserController.login)
}
