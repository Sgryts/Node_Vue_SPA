<template>
    <section id="portfolio">
        <div class="container">
            <ul class="portfolio-sorting list-inline text-center">
                <li><a href="#" data-group="all" class="active">All</a>
                </li>
                <li><a href="#" data-group="moment">Moment</a>
                </li>
                <li><a href="#" data-group="people">People</a>
                </li>
                <li><a href="#" data-group="mountain">Mountain</a>
                </li>
            </ul>
            <div class="row">
                <div class="col-sm-12">
                    <div class="lightbox-grid square-thumbs" data-gallery-title="Gallery">
                        <ul class="portfolio-items list-unstyled" id="grid">
                            <li class="col-md-4 col-sm-12 col-xs-12 no-gutter" data-groups='["moment","people"]'>
                                <a href="img/portfolio1.jpg" data-lightbox="true">
                                    <div class="background-image-holder">
                                        <img alt="portfolio" class="background-image" src="img/portfolio1.jpg" />
                                    </div>
                                </a>
                            </li>
                            <li class="col-md-4 col-sm-12 col-xs-12 no-gutter" data-groups='["people"]'>
                                <a href="img/portfolio2.jpg" data-lightbox="true">
                                    <div class="background-image-holder">
                                        <img alt="portfolio" class="background-image" src="img/portfolio2.jpg" />
                                    </div>
                                </a>
                            </li>
                            <li class="col-md-4 col-sm-12 col-xs-12 no-gutter" data-groups='["mountain"]'>
                                <a href="img/portfolio3.jpg" data-lightbox="true">
                                    <div class="background-image-holder">
                                        <img alt="portfolio" class="background-image" src="img/portfolio3.jpg" />
                                    </div>
                                </a>
                            </li>
                            <li class="col-md-4 col-sm-12 col-xs-12 no-gutter" data-groups='["people"]'>
                                <a href="img/portfolio4.jpg" data-lightbox="true">
                                    <div class="background-image-holder">
                                        <img alt="portfolio" class="background-image" src="img/portfolio4.jpg" />
                                    </div>
                                </a>
                            </li>
                            <li class="col-md-4 col-sm-12 col-xs-12 no-gutter" data-groups='["moment"]'>
                                <a href="img/portfolio5.jpg" data-lightbox="true">
                                    <div class="background-image-holder">
                                        <img alt="portfolio" class="background-image" src="img/portfolio5.jpg" />
                                    </div>
                                </a>
                            </li>
                            <li class="col-md-4 col-sm-12 col-xs-12 no-gutter" data-groups='["people"]'>
                                <a href="img/portfolio6.jpg" data-lightbox="true">
                                    <div class="background-image-holder">
                                        <img alt="portfolio" class="background-image" src="img/portfolio6.jpg" />
                                    </div>
                                </a>
                            </li>
                            <li class="col-md-4 col-sm-12 col-xs-12 no-gutter" data-groups='["people"]'>
                                <a href="img/portfolio7.jpg" data-lightbox="true">
                                    <div class="background-image-holder">
                                        <img alt="portfolio" class="background-image" src="img/portfolio7.jpg" />
                                    </div>
                                </a>
                            </li>
                            <li class="col-md-4 col-sm-12 col-xs-12 no-gutter" data-groups='["mountain"]'>
                                <a href="img/portfolio8.jpg" data-lightbox="true">
                                    <div class="background-image-holder">
                                        <img alt="portfolio" class="background-image" src="img/portfolio8.jpg" />
                                    </div>
                                </a>
                            </li>
                            <li class="col-md-4 col-sm-12 col-xs-12 no-gutter" data-groups='["mountain"]'>
                                <a href="img/portfolio9.jpg" data-lightbox="true">
                                    <div class="background-image-holder">
                                        <img alt="portfolio" class="background-image" src="img/portfolio9.jpg" />
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: 'Gallery'
}
</script>

<style scoped>

</style>
