<template>
    <div id="client">
        <navbar/>
        <router-view/>
    </div>
</template>

<script>
    import NavBar from './Client/NavBar';


    export default {
        name: 'Client',
        components: {navbar: NavBar},
    };
</script>

<style scoped>
</style>
