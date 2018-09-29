<template>
  <div v-if="genres">
    <p v-for="(genre) in genres" :key="genre._id">{{ genre._id }} -- {{ genre.name }}</p>
  </div>
</template>

<script>
import GenreController from '../../controllers/GenreController'

export default {
  name: 'Genres',
  data () {
    return {
      genres: '',
      name: 'NEW',
      error: null
    }
  },
  methods: {
    async all () {
      console.log('ALL')
      try {
        const response = await GenreController.all()
        this.genres = response.data.data
        console.log('data', response.data.data)
      } catch (error) {
        this.error = error.response.data.error
        console.log('err', this.error)
      }
    },
    async show () {
      console.log('SHOW')
      try {
        const response = await GenreController.show('5bae6c9cc88da9b6df3da3f2')
        // this.genres = response.data.data
        console.log('genre', response.data.data)
      } catch (error) {
        this.error = error.response.data.error
        console.log('err', this.error)
      }
    },
    async add () {
      console.log('ADD')
      try {
        const response = await GenreController.add({
          name: this.name
        })
        // this.genres = response.data.data
        console.log('genre', response.data.data)
      } catch (error) {
        this.error = error.response.data.error
        console.log('err', this.error)
      }
    }
  },
  mounted () {
    this.all()
    this.show()
    // this.add()
  }
}
</script>

<style scoped>

</style>
