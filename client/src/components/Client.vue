<template>
    <div>
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="col-md-12">
            <div class="nav">
                <button class="btn-nav">
                    <span class="icon-bar inverted top"></span>
                    <span class="icon-bar inverted middle"></span>
                    <span class="icon-bar inverted bottom"></span>
                </button>
            </div>
            <a class="navbar-brand" href="index.html">
                <img class="logo" src="img/logo.png" alt="logo">
            </a>
            <div class="nav-content hideNav hidden">
                <ul class="nav-list vcenter">
                    <li class="nav-item"><a class="item-anchor" href="index.html">Home</a></li>
                    <li class="nav-item"><a class="item-anchor" href="about.html">About Me</a></li>
                    <li class="nav-item"><a class="item-anchor" href="portfolio.html">Portfolio</a></li>
                    <li class="nav-item"><a class="item-anchor" href="contact.html">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- Header -->
    <div class="span12">
        <div class="col-md-6 no-gutter text-center fill">
            <h2 class="vcenter">Simple is beautiful</h2>
        </div>
        <div class="col-md-6 no-gutter text-center">
            <div id="header" data-speed="2" data-type="background">
                <div id="headslide" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner" role="listbox">
                        <div class="item active">
                            <img src="img/4.jpg" alt="Slide">
                        </div>
                        <div class="item">
                            <img src="img/3.jpg" alt="Slide">
                        </div>
                        <div class="item">
                            <img src="img/1.jpg" alt="Slide">
                        </div>
                        <div class="item">
                            <img src="img/2.jpg" alt="Slide">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'Client'
}
</script>

<style scoped>

</style>
