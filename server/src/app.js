require('sqreen')
const config = require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const mongoose = require('mongoose')
const path = require('path')
// const winston = require('winston')

const app = express()

// error logging
// winston.exceptions.handle(
//   new winston.transports.Console({ colorize: true, prettyPrint: true }),
//   new winston.transports.File({ filename: 'uncaughtExceptions.log' }))
//
// process.on('unhandledRejection', ex => {
//   throw ex
// })
//
// winston.add(winston.transports.File, { filename: 'logfile.log' })
//
// winston.add(winston.transport.MongoDB,
//   {
//     db: config.db.dialect + config.db.host + config.db.database,
//     level: 'error'
//   })

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

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

require('./passport')
require('./routes')(app)

app.listen(process.env.PORT || config.port)
console.log('SUCCESS')

mongoose.Promise = global.Promise
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(config.db.dialect + config.db.host + config.db.database,
    { useNewUrlParser: true }
  )
}
