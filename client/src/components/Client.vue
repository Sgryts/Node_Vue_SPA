<template>
    <div>
    <navbar></navbar>
    <router-view></router-view>
    </div>
</template>

<script>
import Navbar from './client/NavBar'
export default {
  name: 'Client',
  components: {Navbar},
  data () {
    return {

    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>

</style>
