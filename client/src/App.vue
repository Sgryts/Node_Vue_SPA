<template>
  <div id="app">
    <admin>
      <router-view>
      </router-view>
    </admin>
  </div>
</template>

<script>
import Admin from './components/Admin'
// import Client from './components/Client'

export default {
  name: 'App',
  components: {Admin}
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
