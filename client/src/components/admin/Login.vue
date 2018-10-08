<template>
  <v-layout row>
    <admin-header></admin-header>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="grey" dark>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>

        <div class="pl-4 pr-4 pt-2 pb-2">
          <form
            name="login"
            autocomplete="off">
            <v-text-field
              label="Email"
              v-model="email"
              :rules="[required]"
            ></v-text-field>
            <br>
            <v-text-field
              label="Password"
              type="password"
              v-model="password"
              :rules="[required]"
              autocomplete="new-password"
            ></v-text-field>
            <br>
          </form>
          <br>
          <span class="red--text" v-if="error">{{error}}</span>
          <br>
          <v-btn
            dark
            class="grey"
            @click="login">
            Login
          </v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AdminHeader from './Header'

import UserController from '../../controllers/UserController'

export default {
  name: 'Login',
  components: {AdminHeader},
  data () {
    return {
      email: null,
      password: null,
      error: null,
      required: (value) => !!value || 'Required'
    }
  },
  methods: {
    async login () {
      try {
        const response = await UserController.login({
          email: this.email,
          password: this.password
        })
        console.log('RES', response.data)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        // this.$router.push({
        //   name: 'register'
        // })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>

</style>
