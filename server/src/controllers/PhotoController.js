const Photo = require('../models/Photo')
const Genre = require('../models/Genre')
const upload = require('../utils/PhotoUploader')
const Fawn = require('fawn')
const mongoose = require('mongoose')
const fs = require('fs')

Fawn.init(mongoose)

module.exports = {
  // ADMIN - TODO: add showing by genres  -- spread by different components, navigate to the each one on click
  async index (req, res) {
    try {
      const photos = await Photo.find({}).sort('-created').populate({ path: 'genres' })
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
      const id = await req.params.id
      const photo = await Photo.findOne({ _id: id }).populate({ path: 'genres' })
      if (!photo) {
        return res.status(400).send({
          error: 'The photo with the given ID was not found'
        })
      }
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
      await upload(req, res, err => {
        if (err) {
          res.status(500).send({
            error: 'Something went wrong1...' + err
          })
        } else {
          if (req.files === undefined) {
            res.status(500).send({
              error: 'Something went wrong2...' + err
            })
          } else {
            console.log('PHOTO=>', req.files)
            console.log('BODY=>', req.body.name, req.body.genres)

            const genres = JSON.parse(req.body.genres)

            Photo.create({
              name: req.body.name,
              file: req.files[0].filename,
              path: req.files[0].path,
              genres: genres
            })
              .then(photo => {
                for (let genre of JSON.parse(req.body.genres)) {
                  console.log('GENRE', genre)
                  Genre.findById(genre)
                    .then(genre => {
                      genre.photos.push(photo)
                      genre.save()
                    })
                    .catch(err => {
                      // TODO if error  - find and remove stored photo?
                      res.status(500).send({
                        error: 'Something went wrong3...' + err
                      })
                    })
                }
              }).then(photo => {
                console.log('SAVED PHOTO', photo)
                res.status(201).send({
                  data: photo
                })
              })
              .catch(err => {
                // TODO if error  - find and remove stored photo?
                res.status(500).send({
                  error: 'Something went wrong4...' + err
                })
              })
          }
        }
      })
    } catch (err) {
      res.status(500).send({
        error: 'Something went wrong5...' + err
      })
    }
  },
  async put (req, res) {
    try {
      const id = await req.params.id
      const data = await req.body
      console.log('ID', req.params.id)

      // TRANSACTION // TODO : do i need transactions ?
      // new Fawn.Task()
      //   .save('photos', photo)
      //   .update('genres_id',[-update genres array-])
      //   .update('user)id',[-update user_id-])
      // .run()

      // 1 find photo
      // update genres => rm array, replace with new one?
      // update photoname

      await Photo.findOneAndUpdate({ _id: id }, data)
      const photo = await Photo.findOne({ _id: id })
      res.status(201).send({
        data: photo
      })
    } catch (err) {
      res.status(500).send({
        error: 'Something went wrong...' + err
      })
    }
  },
  async destroy (req, res) {
    try {
      const id = await req.params.id
      const photo = await Photo.findOne({ _id: id })
      if (!photo) {
        return res.status(400).send({
          error: 'The photo with the given ID was not found'
        })
      }
      await fs.access(photo.path, err => {
        if (!err) {
          fs.unlink(photo.path, err => {
            if (!err) {
              const genres = photo.genres
              for (let genre of genres) {
                Genre.findById(genre)
                  .then(genre => {
                    genre.photos.filter(ph => ph !== photo)
                    genre.save()
                  })
              }
              photo.remove()
              res.status(204).send({
                data: ''
              })
            } else {
              res.status(500).send({
                error: 'Something went wrong...' + err
              })
            }
          })
        } else {
          res.status(500).send({
            error: 'Something went wrong...' + err
          })
        }
      })
    } catch (err) {
      res.status(500).send({
        error: 'Something went wrong...' + err
      })
    }
  }
  // CLIENT - TODO: add showing by genres
}
