const mongoose = require('mongoose')
const Schema = mongoose.Schema

const photoSchema = new Schema({
  name:
        {
          type: String,
          required: true
        },
  file:
        {
          type: String,
          required: true
        },
  path:
        {
          type: String,
          required: true
        },
  created:
        {
          type: Date,
          default: Date.now
        }
})

module.exports = mongoose.model('photos', photoSchema)
