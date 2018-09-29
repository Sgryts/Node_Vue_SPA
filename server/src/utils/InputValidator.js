const Joi = require('joi')

const validation = {
  email: Joi.string().email().trim().required(),
  password: Joi.string().regex(new RegExp('^[a-zA-z0-9]{2,32}$')).required(),
  subject: Joi.string().max(255).required(),
  message: Joi.string().min(10).max(1000).required(),
  name: Joi.string().email().trim().regex(new RegExp('^[a-zA-z]$')).required()
}

module.exports = {
  register (req, res, next) {
    // register + ass reset
    const { error } = Joi.validate(req.body, validation)
    // console.log(req.body)
    // console.log(error)
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
        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      next()
    }
  },
  email (req, res, next) {
    const { error } = Joi.validate(req.body, validation)
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
    const { error } = Joi.validate(req.body, validation)
    if (error) {
      switch (error.details[0].context.key) {
        case 'name':
          res.status(400).send({
            error: 'Letters only allowed'
          })
          break
        default:
          res.status(400).send({
            error: 'Please resubmit the genre again'
          })
      }
    } else {
      next()
    }
  },
  photos (req, res, next) {
    const { error } = Joi.validate(req.body, validation)
    if (error) {
      switch (error.details[0].context.key) {
        case 'name':
          res.status(400).send({
            error: 'Letters only allowed'
          })
          break
        default:
          res.status(400).send({
            error: 'Please resubmit the genre again'
          })
      }
    } else {
      next()
    }
  }
}
