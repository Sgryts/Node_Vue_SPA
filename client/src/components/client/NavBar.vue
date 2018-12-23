<template>
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="col-md-12">
            <div class="nav">
                <button class="btn-nav">
                    <span class="icon-bar inverted top"></span>
                    <span class="icon-bar inverted middle"></span>
                    <span class="icon-bar inverted bottom"></span>
                </button>
            </div>
            <router-link class="navbar-brand" to="/home">
                <img class="logo" src="img/logo.png" alt="logo">
            </router-link>
            <div class="nav-content"
                 :class="{
                'hideNav':showNav,
                'hidden':showNav,
                 'showNav': !showNav}"
                 @click="showNav = !showNav"
            >
                <ul class="nav-list vcenter">
                    <li class="nav-item">
                        <router-link class="item-anchor" to="/home">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="item-anchor" to="/about">About Me</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="item-anchor" to="/gallery">Portfolio</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="item-anchor" to="/contact">Contact</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      showNav: false
    }
  }
}
</script>

<style scoped>

</style>
