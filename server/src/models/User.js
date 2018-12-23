const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt')
const SALT = require('../config/config').salt.rounds

const userSchema = new Schema({
  email:
      {
        type: String,
        required: true,
        unique: true
      },
  password:
      {
        type: String,
        required: true
      }
})

userSchema.pre('save', function (next) {
  let user = this

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(SALT, function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)

      user.password = hash

      next()
    })
  })
})

module.exports = mongoose.model('users', userSchema)
