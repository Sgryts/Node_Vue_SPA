const Genre = require('../models/Genre')

module.exports = {
  async all (req, res) {
    try {
      const genres = await Genre.find({})
      res.status(200).send({
        data: genres
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
      const genre = await Genre.findOne({ _id: id })
      res.status(200).send({
        data: genre
      })
    } catch (err) {
      res.status(500).send({
        error: 'Something went wrong...' + err
      })
    }
  },
  async add (req, res) {
    try {
      const genre = await Genre.create(req.body)
      res.status(201).send({
        data: genre
      })
    } catch (err) {
      res.status(500).send({
        error: 'This genre already exists'
      })
    }
  },
  async update (req, res) {
    try {
      const id = req.params.id
      const data = req.body
      console.log('ID', req.params.id)
      console.log('DATA', data)
      console.log('BODY=>', req)
      const genre = await Genre.findOneAndUpdate({ _id: id }, data)
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
      const genres = await Genre.findOneAndRemove({ _id: id })
      res.status(204).send({
        data: genres
      })
    } catch (err) {
      res.status(500).send({
        error: 'Something went wrong...' + err
      })
    }
  }
}
