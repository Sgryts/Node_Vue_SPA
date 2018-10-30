const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const genresSchema = require('Genre')
// const userSchema = require('User')

const photoSchema = new Schema({
  name:
        {
          type: String,
          required: true
        },
  // genres: [genresSchema],
  // user: [userSchema],
  created:
        {
          type: Date,
          default: Date.now
        }
})

module.exports = mongoose.model('photos', photoSchema)
