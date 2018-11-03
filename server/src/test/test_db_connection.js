/* eslint-env mocha */
const mongoose = require('mongoose')
const config = require('../config/config')

before(done => {
  mongoose
    .connect(config.db.dialect + config.db.host + config.db.database,
      { useNewUrlParser: true }
    )
    .once('open', () => done())
    .on('error', err => {
      console.warn('ERROR: ', err)
    })
})

beforeEach(done => {
  const { genres, photos, users } = mongoose.connection.collections
  Promise.all([ genres.drop(), users.drop(), photos.drop() ])
    .then(() => done())
    .catch(() => done())
})
