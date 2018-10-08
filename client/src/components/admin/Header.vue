<template>
  <v-toolbar fixed class="grey" dark>
    <v-toolbar-title class="mr-4">
      <span
        class="home"
        @click="navigateTo({name: 'root'})">
        SG Pixels
      </span>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn
        flat
        dark
        @click="navigateTo({name: 'songs'})">
        Browse
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <!--<v-toolbar-items>-->
      <!--<v-btn-->
        <!--v-if="!$store.state.isUserLoggedIn"-->
        <!--flat-->
        <!--dark-->
        <!--@click="navigateTo({name: 'login'})">-->
        <!--Login-->
      <!--</v-btn>-->

      <!--<v-btn-->
        <!--v-if="!$store.state.isUserLoggedIn"-->
        <!--flat-->
        <!--dark-->
        <!--@click="navigateTo({name: 'register'})">-->
        <!--Sign Up-->
      <!--</v-btn>-->

      <!--<v-btn-->
        <!--v-if="$store.state.isUserLoggedIn"-->
        <!--flat-->
        <!--dark-->
        <!--@click="logout">-->
        <!--Logout-->
      <!--</v-btn>-->
    <!--</v-toolbar-items>-->
  </v-toolbar>
</template>

<script>
export default {
  name: 'AdminHeader',
  data () {
    return {

    }
  }
}
</script>

<style scoped>

</style>
