const SALT = require('../config/config').salt
const mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt')

var userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
})

userSchema.methods.encryptPassword = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT), null) // 5 rounds of salt creation
}

userSchema.methods.validPassword = password => {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('users', userSchema)
