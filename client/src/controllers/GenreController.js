import api from '@/api/api'

export default {
  index () {
    return api().get('/admin/genres')
  },
  show (id) {
    return api().get(`admin/genres/${id}`)
  },
  post (data) {
    return api().post(`admin/genres`, data)
  },
  put (id, data) {
    console.log('ID=>', id)
    console.log('NAME=>', data)
    return api().put(`admin/genres/${id}`, data)
  },
  destroy (id) {
    return api().delete(`admin/genres/${id}`)
  }
}
