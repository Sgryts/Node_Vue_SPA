const mongoose = require('mongoose')
var Schema = mongoose.Schema

var genreSchema = new Schema({
  name:
      {
        type: String,
        required: true,
        unique: true
      }
})

module.exports = mongoose.model('genres', genreSchema)
