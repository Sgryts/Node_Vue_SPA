console.log('SUCCESS')
const config = require('./config/config')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Promise = require('bluebird')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

app.listen(process.env.PORT || config.port)

mongoose.Promise = Promise
mongoose
  .connect(config.db.dialect + config.db.host + config.db.database,
    { useNewUrlParser: true }
  )
