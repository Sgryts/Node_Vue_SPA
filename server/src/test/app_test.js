/* eslint-env mocha */
const app = require('../app')
const request = require('supertest')
const assert = require('assert')

describe('Express app', () => {
  it('GET request to /admin/genres', done => {
    request(app)
      .get('/admin/genres')
      .send('')
      .end((err, responce) => {
        if (!err) {
          assert(responce)
        }
        done()
      })
  })
})
