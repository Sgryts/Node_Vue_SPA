const mongoose = require('mongoose')
var Schema = mongoose.Schema

var photoSchema = new Schema({
  name:
        {
          type: String,
          required: true
        },
  genre_id:
        [
          {
            type: Schema.Types.ObjectId,
            ref: 'genres'
          }
        ],
  user_id:
        [
          {
            type: Schema.Types.ObjectId,
            ref: 'users'
          }
        ],
  created:
        {
          type: Date,
          default: Date.now
        }
})

module.exports = mongoose.model('photos', photoSchema)
