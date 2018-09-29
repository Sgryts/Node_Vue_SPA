const mongoose = require('mongoose')
var Schema = mongoose.Schema

// var bcrypt = require('bcrypt')
// const SALT = require('../config/config').salt

const userSchema = new Schema({
  email: { type: String,
    required: true,
    unique: true },
  password: { type: String,
    required: true }
})

//
// bcrypt.hash(password, saltRounds, function(err, hash) {
//     // Store hash in your password DB.
// });
//
// bcrypt.compare(password, hash, function(err, res) {
//     // res == true
// });

// userSchema.methods.encryptPassword = password => {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT), null)
// }
//
// userSchema.methods.validPassword = password => {
//   return bcrypt.compareSync(password, this.password)
// }

module.exports = mongoose.model('users', userSchema)
