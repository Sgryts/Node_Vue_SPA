const mongoose = require('mongoose')
var Schema = mongoose.Schema

var photoSchema = new Schema({
  name: { type: String, required: true },
  genre_id: { type: String, required: true },
  user_id: { type: String, required: true }
})

module.exports = mongoose.model('photos', photoSchema)
