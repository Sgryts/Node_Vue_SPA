console.log('SUCCESS')
// require('sqreen')
const config = require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const mongoose = require('mongoose')
// const { join } = require('path')

const app = express()

app.use(morgan('combined'))
app.use(helmet.xssFilter())
app.use(helmet.frameguard({ action: 'deny' }))
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", 'fonts.googleapis.com'],
    fontSrc: ["'self'", 'fonts.gstatic.com', 'data:'],
    scriptSrc: ["'self'", 'code.jquery.com']
  }
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

require('./passport')
require('./routes')(app)

app.listen(process.env.PORT || config.port)

mongoose.Promise = global.Promise
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(config.db.dialect + config.db.host + config.db.database,
    { useNewUrlParser: true }
  )
}
