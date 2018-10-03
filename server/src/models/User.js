const mongoose = require('mongoose')
var Schema = mongoose.Schema

var bcrypt = require('bcrypt')
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
  var user = this

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
