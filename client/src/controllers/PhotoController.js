import api from '@/api/api'

export default {
  index () {
    return api().get('/admin/photos')
  }
}
