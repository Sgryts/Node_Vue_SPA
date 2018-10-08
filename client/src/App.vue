<template>
  <div id="app">
    <v-app>
      <!--<admin-header/>-->
      <main>
        <v-container fluid>
          <router-view>
          </router-view>
        </v-container>
      </main>
    </v-app>
    <!--<admin>-->
      <!--<router-view>-->
      <!--</router-view>-->
    <!--</admin>-->
  </div>
</template>

<script>
// import AdminHeader from './components/admin/Header'
// import Client from './components/Client'

export default {
  name: 'App'
  // components: {'admin-header': AdminHeader}
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
