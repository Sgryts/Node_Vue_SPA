console.log('SUCCESS')
require('sqreen')
const config = require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const mongoose = require('mongoose')
const path = require('path')
const winston = require('winston')

const app = express()

// error logging
process.on('unhandledRejection', err => {
  throw err
})
winston.handleExceptions(new winston.transport.File({ filename: 'uncaughtExceptions.log' }))
winston.add(winston.transport.File, { filename: 'errorlog.log' })
winston.add(winston.transport.MongoDB,
  {
    db: config.db.dialect + config.db.host + config.db.database,
    level: 'error'
  })

app.use(morgan('combined'))
app.use(cors())
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
app.use(express.static(path.join(__dirname, 'public')))

require('./passport')
require('./routes')(app)

app.listen(process.env.PORT || config.port)

mongoose.Promise = global.Promise
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(config.db.dialect + config.db.host + config.db.database,
    { useNewUrlParser: true }
  )
}
