import api from '@/api/api'

export default {
  all () {
    return api().get(`/admin/genres`)
  },
  register (data) {
    return api().post(`/admin/register`, data)
  },
  login (data) {
    return api().post('/admin/login', data)
  },
  logout () {
    return api().post('/admin/logout')
  }
}
