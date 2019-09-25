<template>
    <nav class="navbar navbar-default color-fill navbar-fixed-top">
        <div class="col-md-12">
            <div class="nav">
                <button class="btn-nav" :class="[isNavbarVisible ? 'animated' : '']"
                        @click="isNavbarVisibleClicked()">
                    <span class="icon-bar inverted top"></span>
                    <span class="icon-bar inverted middle"></span>
                    <span class="icon-bar inverted bottom"></span>
                </button>
            </div>
            <a class="navbar-brand" href="index.html">
                SG PIXELS ...
                <img class="logo" src="img/logo.png" alt="logo">
            </a>
            <div class="nav-content" :class="[isNavbarVisible ? 'showNav' : 'hideNav hidden']">
                <ul class="nav-list vcenter">
                    <li class="nav-item" @click="isNavbarVisibleClicked()">
                        <router-link class="item-anchor" to="/home">
                            Home
                        </router-link>
                    </li>
                    <li class="nav-item" @click="isNavbarVisibleClicked()">
                        <router-link class="item-anchor" to="/about">
                            About Me
                        </router-link>
                    </li>
                    <li class="nav-item" @click="isNavbarVisibleClicked()">
                        <router-link class="item-anchor" to="/gallery">
                            Gallery
                        </router-link>
                    </li>
                    <li class="nav-item" @click="isNavbarVisibleClicked()">
                        <router-link class="item-anchor" to="/contact">
                            Contact
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'NavBar',
        data() {
            return {
                isNavbarVisible: false,
            };
        },
        methods: {
            isNavbarVisibleClicked() {
                this.isNavbarVisible = !this.isNavbarVisible;
            },
        },
    };
</script>

<style scoped>

</style>
