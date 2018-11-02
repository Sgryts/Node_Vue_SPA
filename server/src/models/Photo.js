const mongoose = require('mongoose')
const Schema = mongoose.Schema

const photoSchema = new Schema({
  name:
        {
          type: String,
          required: true
        },
  genres:
          [{
            type: Schema.Types.ObjectId,
            ref: 'genres'
          }],
  user_id:
          {
            type: Schema.Types.ObjectId,
            ref: 'users'
          },
  created:
        {
          type: Date,
          default: Date.now
        }
})

module.exports = mongoose.model('photos', photoSchema)
