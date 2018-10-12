<template>
  <v-toolbar fixed class="grey" dark>
    <v-toolbar-title class="mr-4">
      <span
        class="home"
       :to="({name: 'admin'})">
        SG Pixels
      </span>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn
        flat
        dark
        :to="({name: 'admin'})">
        Admin
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn
        v-if="!$store.state.loggedIn"
        flat
        dark
        :to="({name: 'login'})">
        Login
      </v-btn>

      <v-btn
        v-if="!$store.state.loggedIn"
        flat
        dark
        :to="({name: 'register'})">
        Sign Up
      </v-btn>

      <v-btn
        v-if="$store.state.loggedIn"
        flat
        dark
        @click="logout">
        Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'AdminHeader',
  data () {
    return {

    }
  },
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style scoped>

</style>
