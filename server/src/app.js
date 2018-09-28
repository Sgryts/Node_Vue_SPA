console.log('SUCCESS')
const config = require('./config/config')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.listen(process.env.PORT || config.port)
mongoose.connect(config.db.dialect + config.db.host + config.db.database, { useNewUrlParser: true })

app.get('/', (req, res) => {
  res.send({
    message: 'YO!'
  })
})
