import api from '@/api/api'

export default {
  all () {
    return api().get('/admin/genres')
  },
  show (id) {
    return api().get(`admin/genres/${id}`)
  },
  add (data) {
    return api().post(`admin/genres`, data)
  },
  update (id, data) {
    console.log('ID=>', id)
    console.log('NAME=>', data)
    return api().put(`admin/genres/${id}`, data)
  },
  destroy (id) {
    return api().delete(`admin/genres/${id}`)
  }
}
