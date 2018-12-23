/* eslint-env mocha */
const app = require('../app')
const request = require('supertest')
// .agent(app.listen())
const assert = require('assert')
// const mongoose = require('mongoose')
// const Genre = mongoose.model('genres')

describe('Express app', () => {
  it('GET request to /admin/genres', async () => {
    const response = await request(app).get('/admin/genres')
    assert(response.status === 200)
  })
})

//  expect(response.statusCode).toBe(200);
