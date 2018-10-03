import api from '@/api/api'

export default {
  register (data) {
    return api.post('admin/register', data)
  },
  login (data) {
    return api.post('admin/login', data)
  },
  logout (data) {
    return api.post('admin/logout')
  }
}
