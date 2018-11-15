const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const registerValidation = {
  email: Joi.string().email().trim().required(),
  password: Joi.string().regex(new RegExp('^[a-zA-z0-9]{2,32}$')).required(),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required()
}
const emailValidation = {
  email: Joi.string().email().trim().required(),
  subject: Joi.string().max(255).required(),
  message: Joi.string().min(10).max(1000).required()
}

const genresValidation = {
  name: Joi.string().trim().required()
}

const photoValidation = {
  name: Joi.string().trim().required(),
  genres_id: Joi.array().items(Joi.objectId()),
  user_id: Joi.objectId()
}

module.exports = {

  register (req, res, next) {
    // register + email reset
    const { error } = Joi.validate(req.body, registerValidation)
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'Invalid email'
          })
          break
        case 'password':
          res.status(400).send({
            error: 'Password must be only letters or numbers and 8-32 characters length'
          })
          break
        case 'confirmPassword':
          res.status(400).send({
            error: 'Passwords has to match'
          })
          break
        default:
          console.log(error)
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      next()
    }
  },

  email (req, res, next) {
    const { error } = Joi.validate(req.body, emailValidation)
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'Invalid email'
          })
          break
        case 'subject':
          res.status(400).send({
            error: 'Subject is required(max 255 characters)'
          })
          break
        case 'message':
          res.status(400).send({
            error: 'Message is required (min 10 - max 1000 characters)'
          })
          break
        default:
          res.status(400).send({
            error: 'Please resubmit the email again'
          })
      }
    } else {
      next()
    }
  },
  genres (req, res, next) {
    const { error } = Joi.validate(req.body, genresValidation)
    if (error) {
      switch (error.details[0].context.key) {
        case 'name':
          res.status(400).send({
            error: 'Invalid genre name'
          })
          break
        default:
          res.status(400).send({
            error: 'Please resubmit a genre again'
          })
      }
    } else {
      next()
    }
  },

  photos (req, res, next) {
    const { error } = Joi.validate(req.body, photoValidation)
    if (error) {
      switch (error.details[0].context.key) {
        case 'name':
          res.status(400).send({
            error: 'Invalid photo name'
          })
          break
        case 'genres_id':
          res.status(400).send({
            error: 'Genres IDs are invalid'
          })
          break
        case 'user_id':
          res.status(400).send({
            error: 'User ID is invalid'
          })
          break
        default:
          res.status(400).send({
            error: 'Please resubmit a photo again'
          })
      }
    } else {
      next()
    }
  }
}
