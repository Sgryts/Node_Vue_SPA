<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="grey" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>

        <div class="pl-4 pr-4 pt-2 pb-2">
          <form
            name="register"
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
            <v-text-field
              label="Confirm Password"
              type="password"
              v-model="confirmPassword"
              :rules="[required]"
              autocomplete="new-password"
            ></v-text-field>
          </form>
          <br>
          <span class="red--text" v-if="error">{{error}}</span>
          <br>
          <v-btn
            dark
            class="grey"
            @click="register">
            Register
          </v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import UserController from '../../controllers/UserController'

export default {
  name: 'Register',
  data () {
    return {
      email: null,
      password: null,
      confirmPassword: null,
      error: null,
      required: (value) => !!value || 'Required'
    }
  },
  methods: {
    async  register () {
      this.error = null
      try {
        await UserController.register({
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        })
        this.$router.push({
          name: 'login'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>

</style>
