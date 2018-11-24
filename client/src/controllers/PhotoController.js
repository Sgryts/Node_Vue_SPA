import api from '@/api/api'

export default {
  index () {
    return api().get('/admin/photos')
  },
  post (data) {
    console.log('api', data)
    return api().post('/admin/photos', data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
  }
}
