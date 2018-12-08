import api from '@/api/api'

export default {
  index () {
    return api().get('/admin/photos')
  },
  show (id) {
    return api().get(`admin/photos/${id}`)
  },
  post (data) {
    console.log('api', data)
    return api().post('/admin/photos', data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
  },
  put (id, data) {
    return api().post(`/admin/photos/${id}`, data)
  },
  destroy (id) {
    return api().delete(`admin/photos/${id}`)
  }
}
