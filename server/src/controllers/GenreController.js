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
      const id = await req.params.id
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
      const id = await req.params.id
      await Genre.findOneAndUpdate({ _id: id }, req.body)
      const updatedGenre = await Genre.findOne({ _id: id })
      res.status(201).send({
        data: updatedGenre
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
      await Genre.findOneAndRemove({ _id: id })
      res.status(204).send({
        data: ''
      })
    } catch (err) {
      res.status(500).send({
        error: 'Something went wrong...' + err
      })
    }
  }
}
