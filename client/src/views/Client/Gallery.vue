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
            <div>
                <ul class="portfolio-sorting list-inline text-center"
                    v-if="genres"
                >
                    <li v-for="(genre,i) in genres" :key="i">
                        <a href="#"
                           :data-group="genre"
                        >
                            {{genre.name}}
                        </a>
                    </li>
                    <!--TODO highlight selected genres-->
                    <!--<li v-for="(genre,i) in genres" :key="i">-->
                    <!--<a href="#" data-group="genre"-->
                    <!--:class="{active:i === selected}"-->
                    <!--@click="selected = i"-->
                    <!--class="active"-->
                    <!--&gt;-->
                    <!--{{genre.name}}-->
                    <!--</a>-->
                    <!--</li>-->
                </ul>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div class="lightbox-grid square-thumbs" data-gallery-title="Gallery">
                        <ul class="portfolio-items list-unstyled" id="grid">
                            <li class="col-md-4 col-sm-12 col-xs-12 no-gutter" data-groups='["moment","people"]'>
                                <a href="img/portfolio1.jpg" data-lightbox="true">
                                    <div class="background-image-holder">
                                        <img alt="portfolio" class="background-image" src="img/portfolio1.jpg"/>
                                    </div>
                                </a>
                            </li>
                            <li class="col-md-4 col-sm-12 col-xs-12 no-gutter" data-groups='["people"]'>
                                <a href="img/portfolio2.jpg" data-lightbox="true">
                                    <div class="background-image-holder">
                                        <img alt="portfolio" class="background-image" src="img/portfolio2.jpg"/>
                                    </div>
                                </a>
                            </li>
                            <li class="col-md-4 col-sm-12 col-xs-12 no-gutter" data-groups='["mountain"]'>
                                <a href="img/portfolio3.jpg" data-lightbox="true">
                                    <div class="background-image-holder">
                                        <img alt="portfolio" class="background-image" src="img/portfolio3.jpg"/>
                                    </div>
                                </a>
                            </li>
                            <li class="col-md-4 col-sm-12 col-xs-12 no-gutter" data-groups='["people"]'>
                                <a href="img/portfolio4.jpg" data-lightbox="true">
                                    <div class="background-image-holder">
                                        <img alt="portfolio" class="background-image" src="img/portfolio4.jpg"/>
                                    </div>
                                </a>
                            </li>
                            <li class="col-md-4 col-sm-12 col-xs-12 no-gutter" data-groups='["moment"]'>
                                <a href="img/portfolio5.jpg" data-lightbox="true">
                                    <div class="background-image-holder">
                                        <img alt="portfolio" class="background-image" src="img/portfolio5.jpg"/>
                                    </div>
                                </a>
                            </li>
                            <li class="col-md-4 col-sm-12 col-xs-12 no-gutter" data-groups='["people"]'>
                                <a href="img/portfolio6.jpg" data-lightbox="true">
                                    <div class="background-image-holder">
                                        <img alt="portfolio" class="background-image" src="img/portfolio6.jpg"/>
                                    </div>
                                </a>
                            </li>
                            <li class="col-md-4 col-sm-12 col-xs-12 no-gutter" data-groups='["people"]'>
                                <a href="img/portfolio7.jpg" data-lightbox="true">
                                    <div class="background-image-holder">
                                        <img alt="portfolio" class="background-image" src="img/portfolio7.jpg"/>
                                    </div>
                                </a>
                            </li>
                            <li class="col-md-4 col-sm-12 col-xs-12 no-gutter" data-groups='["mountain"]'>
                                <a href="img/portfolio8.jpg" data-lightbox="true">
                                    <div class="background-image-holder">
                                        <img alt="portfolio" class="background-image" src="img/portfolio8.jpg"/>
                                    </div>
                                </a>
                            </li>
                            <li class="col-md-4 col-sm-12 col-xs-12 no-gutter" data-groups='["mountain"]'>
                                <a href="img/portfolio9.jpg" data-lightbox="true">
                                    <div class="background-image-holder">
                                        <img alt="portfolio" class="background-image" src="img/portfolio9.jpg"/>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="lightbox-grid square-thumbs"
                         data-gallery-title="Gallery"
                    >
                        <hr>
                        <h1>MY PHOTOS BELOW</h1>
                        <br><br>
                        <ul class="portfolio-items list-unstyled"
                            id="gridZ"
                            v-if="photos"
                        >
                            <li class="col-md-4 col-sm-12 col-xs-12 no-gutter"
                                data-groups='["moment","people"]'
                                v-for="(photo, i) in photos"
                                :key="i"
                            >
                                {{photo.path}}
                                <a :href="photo.path"
                                   data-lightbox="true">
                                    <div class="background-image-holder"
                                    >
                                        <img :alt="photo.name"
                                             class="background-image"
                                             :src="photo.path"
                                        />
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

<script lang="ts">
    import IGenre from '@/models/genre';
    import IPhoto from '@/models/photo';
    import {genreService} from '@/services/client/genre';
    import {photoService} from '@/services/client/photo';
    import {Component, Vue} from 'vue-property-decorator';
    import _ from 'lodash';

    @Component({
        components: {
            Gallery,
        },
    })
    export default class Gallery extends Vue {
        public genres: IGenre[] = [];
        public allGenre: IGenre;
        public photos: IPhoto[] = [];
        public error: object;

        // public selected: string;

        constructor() {
            super();
        }

        public created() {
            this.getGenres();
            this.getPhotos();
            this.getGenre('5cbfc635ba8bcdaa8cb97083');
            this.getPhotosByGenre('5cbfc635ba8bcdaa8cb97083');
        }

        private async getGenres(): Promise<any> {
            try {
                const genresPromise = await genreService.index();
                this.genres = _.get(genresPromise, 'data.data');
                console.log('Genres', this.genres);
                const genres = [{
                    '_id': '5cbfc635ba8bcdaa8cb97083',
                    'name': 'Portair',
                    'createdAt': '2019-04-24T02:13:09.103Z',
                    'updatedAt': '2019-04-24T02:13:09.103Z',
                    '__v': 0
                }, {
                    '_id': '5cbfc751ba16b6b4824ca001',
                    'name': 'All',
                    'created_at': '2019-04-24T02:17:53.617Z',
                    'updated_at': '2019-04-24T02:17:53.617Z',
                    '__v': 0
                }];
                // const g = _.head(_.filter(genres, g => g.name === 'All'));
                // const g = _.head(genres.filter(g => g.name === 'All'));
                // genres.forEach(function(k,v) {
                //     console.log(k,v)
                // });

                console.log('ALL-G', genres.forEach(function(m){console.log(m)}));
            } catch (error) {
                this.error = error;
                console.log('err', this.error);
            }
        }

        private async getGenre(id: string): Promise<any> {
            try {
                const genrePromise = await genreService.show(id);
                console.log('Genre', genrePromise);
            } catch (error) {
                this.error = error;
                console.log('err', this.error);
            }
        }

        // by default load 'All', then pass a genre every time on click to rerender photos
        // or load all photos and filter out based on a genre?
        private async getPhotosByGenre(id: string): Promise<any> {
            try {
                const photosByGenrePromise = await genreService.showPhotosByGenre(id);
                console.log('PhotosByGenre', photosByGenrePromise);
            } catch (error) {
                this.error = error;
                console.log('err', this.error);
            }
        }

        private async getPhotos(): Promise<any> {
            try {
                const photosPromise = await photoService.index();
                this.photos = _.get(photosPromise, 'data.data');
                //file:///Users/sgryt/Sites/nodeJS/photo-site/server/src/uploads/img/
                console.log('Photos', this.photos);
            } catch (error) {
                this.error = error;
                console.log('err', this.error);
            }
        }


    }
</script>

<style scoped>

</style>
