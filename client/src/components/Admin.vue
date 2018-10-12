<template>
  <div>
    <admin-header></admin-header>
    <v-layout row>
      <v-flex xs-3>
        <side-control>
        </side-control>
      </v-flex>
      <v-flex xs-9>
        <!--<photos></photos>-->
        <genres></genres>
      </v-flex>
    </v-layout>
    <admin-footer></admin-footer>
  </div>
</template>

<script>
import Photos from './admin/Photos'
import Genres from './admin/Genres'
import SideControl from '../components/admin/SideControl'

import AdminHeader from '../components/admin/Header'
import AdminFooter from '../components/admin/Footer'

import {mapState} from 'vuex'

export default {
  name: 'Admin',
  components: {Photos, Genres, AdminHeader, SideControl, AdminFooter},
  data () {
    return {
    }
  },
  props: [],
  methods: {

  },
  computed: {
    ...mapState(['loggedIn', 'user'])
  }

}
</script>
