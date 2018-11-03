console.warn('SUCCESS')
const config = require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
// const Promise = require('bluebird')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// require('./services/passport')
require('./routes')(app)

app.listen(process.env.PORT || config.port)

mongoose.Promise = global.Promise
if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(config.db.dialect + config.db.host + config.db.database,
      { useNewUrlParser: true }
    )
}
