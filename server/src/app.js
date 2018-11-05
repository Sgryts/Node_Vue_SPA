console.log('SUCCESS')
const config = require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
// const path = require('path')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))
app.use(cors())
app.use(express.static('./uploads/img'))

// require('./services/passport')
require('./routes')(app)

app.listen(process.env.PORT || config.port)

mongoose.Promise = global.Promise
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(config.db.dialect + config.db.host + config.db.database,
    { useNewUrlParser: true }
  )
}
