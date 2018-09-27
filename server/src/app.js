console.log('SUCCESS')

const DEV_PORT = 3030

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.listen(process.env.PORT || DEV_PORT)

app.get('/', (req, res) => {
  res.send({
    message: 'YO!'
  })
})
