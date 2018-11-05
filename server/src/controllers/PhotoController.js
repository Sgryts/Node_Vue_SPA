const Photo = require('../models/Photo')
const upload = require('../utils/PhotoUploader')

module.exports = {
  // ADMIN - TODO: add showing by genres  -- spread by different components, navigate to the each one on click
  async index (req, res) {
    try {
      const photos = await Photo.find({})
      res.status(200).send({
        data: photos
      })
    } catch (err) {
      res.status(500).send({
        error: 'Something went wrong...' + err
      })
    }
  },
  async show (req, res) {
    try {
      const id = req.params.id
      const photo = await Photo.findOne({ _id: id })
      res.status(200).send({
        data: photo
      })
    } catch (err) {
      res.status(500).send({
        error: 'Something went wrong...' + err
      })
    }
  },
  async post (req, res) {
    try {
      console.log('PHOTO=>', req.files, req.file)

      upload(req, res, (err) => {
        if (err) {
          res.status(500).send({
            error: 'WRONG1'
          })
        } else {
          if (req.file === undefined) {
            res.status(500).send({
              error: 'WRONG2'
            })
          } else {
            res.status(201).send({
              data: 'Uploaded'
            })
          }
        }
      })

      // const photo = await Photo.create(req.body)
      // res.status(201).send({
      //   // data: photo
      // })
    } catch (err) {
      res.status(500).send({
        error: 'This genre already exists'
      })
    }
  },
  async put (req, res) {
    try {
      const id = req.params.id
      const data = req.body
      console.log('ID', req.params.id)
      // console.log('DATA', data)
      // console.log('BODY=>', req)
      const genre = await Photo.findOneAndUpdate({ _id: id }, data)
      res.status(201).send({
        data: genre
      })
    } catch (err) {
      res.status(500).send({
        error: 'Something went wrong...' + err
      })
    }
  },
  async destroy (req, res) {
    try {
      const id = req.params.id
      const photo = await Photo.findOneAndRemove({ _id: id })
      res.status(204).send({
        data: photo
      })
    } catch (err) {
      res.status(500).send({
        error: 'Something went wrong...' + err
      })
    }
  }
  // CLIENT - TODO: add showing by genres
}
