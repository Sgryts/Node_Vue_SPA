const config = require('../config/config')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt')

function sendToken (user, res) {
  const JSON = user.toJSON()
  res.status(200).send({
    user: JSON,
    token: jwtSignIn(JSON)
  })
}

function jwtSignIn (user) {
  return jwt.sign(user, config.authentication.jwt_encryption, {
    expiresIn: config.authentication.jwt_expiration
  })
}

function comparePasswords (logpass, userpass, user, res) {
  bcrypt.compare(logpass, userpass, function (err, istrue) {
    if (err) {
      return res.status(500).send({
        error: 'An error has occurred, please log in again 1'
      })
    }
    if (istrue) {
      sendToken(user, res)
    } else {
      return res.status(403).send({
        error: 'The login information was incorrect 2'
      })
    }
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
      const { email, password } = req.body
      const user = await User.findOne({ email: email })

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect 1'
        })
      }
      comparePasswords(password, user.password, user, res)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred, please log in again'
      })
    }
  },
  async logout (req, res) {
    try {
      // name, pass = null
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred, please log out again'
      })
    }
  },
  sendEmail () {

  },
  updateUser () {

  }
}
