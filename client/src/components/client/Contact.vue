<template>
  <div>
  <nav class="navbar navbar-default color-fill navbar-fixed-top">
    <div class="col-md-12">
      <div class="nav">
        <button class="btn-nav">
          <span class="icon-bar top"></span>
          <span class="icon-bar middle"></span>
          <span class="icon-bar bottom"></span>
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
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1>
            What the hell are you waiting for? <br>
            Say hello to me!
          </h1>
          <h4><a href="mailto:hello@echoestemplate.com">hello@echoestemplate.com</a></h4>
        </div>
      </div>
      <div class="row margin-top-45">
        <div class="col-md-12">
          <img class="img-responsive margin-top-45" src="img/5.jpg" alt="me">
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script>
export default {
  name: 'Email',
  data () {
    return {
      dialog: false
    }
  }
}
</script>

<style scoped>

</style>
