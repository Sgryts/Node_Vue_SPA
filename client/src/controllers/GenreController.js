import api from '@/api/api'

export default {
  all () {
    return api().get('/admin/genres')
  },
  show (id) {
    return api().get(`admin/genres/${id}`)
  },
  add (name) {
    return api().post(`admin/genres`, name)
  },
  update (id, name) {
    return api().put(`admin/genres/${id}`, name)
  },
  destroy (id) {
    return api().delete(`admin/genres/${id}`)
  }
}
