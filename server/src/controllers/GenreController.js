const Genre = require('../models/Genre')

module.exports = {
  async all (req, res) {
    try {
      const genres = await Genre.find({})
      console.log('ZGENRES')
      res.send({
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
      const { id } = req.body
      const genre = await Genre.findOne({ id: id })
      res.send({
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
      res.send({
        data: genre
      })
    } catch (err) {
      res.status(500).send({
        error: 'Something went wrong...' + err
      })
    }
  },
  async update (req, res) {
    try {
      const { id } = req.body
      const genre = await Genre.findOneAndUpdate({ id: id })
      res.send({
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
      const { id } = req.body
      const genres = await Genre.findOneAndRemove({ id: id })
      res.send({
        data: genres
      })
    } catch (err) {
      res.status(500).send({
        error: 'Something went wrong...' + err
      })
    }
  }
}
