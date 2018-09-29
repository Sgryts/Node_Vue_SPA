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
  update (id) {
    return api().put(`admin/genres/${id}`)
  },
  destroy (id) {
    return api().delete(`admin/genres/${id}`)
  }
}
