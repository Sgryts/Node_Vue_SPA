import api from '@/api/api'

export default {
  all () {
    return api().get('/admin/genres')
  }
  // show (data) {
  //   return api.post(`admin/genre/${id}`, data)
  // }
}
