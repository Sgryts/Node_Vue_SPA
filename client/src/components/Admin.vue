<template>
  <div>
    <admin-header></admin-header>
    <side-control></side-control>
  </div>
</template>

<script>
import Photos from './admin/Photos'
import Genres from './admin/Genres'
import SideControl from '../components/admin/SideControl'

import AdminHeader from '../components/admin/Header'

export default {
  name: 'Admin',
  components: {SideControl, Photos, Genres, AdminHeader},
  data () {
    return {
    }
  },
  props: {

  },
  methods: {

  }
}
</script>
