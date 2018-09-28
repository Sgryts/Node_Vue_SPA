const config = require('../config/config')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

function sendToken (user, res) {
  const JSON = user.toJSON()
  res.send({
    user: JSON,
    token: jwtSignIn(JSON)
  })
}

function jwtSignIn (user) {
  return jwt.sign(user, config.authentication.jwt_encryption, {
    expiresIn: config.authentication.jwt_expiration
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      sendToken(user, res)
    } catch (err) {
      res.status(400).send({
        error: 'This account is already in use'
      })
    }
  },
  async login (req, res) {
    try {
      const user = await User.find(req.body)
      sendToken(user, res)
    } catch (err) {
      res.status(400).send({
        error: 'This account is already in use'
      })
    }
  }
}
