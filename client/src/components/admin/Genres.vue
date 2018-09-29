<template>
  <div v-if="genres">
    <p v-for="genre in genres" :key="genre.id">{{ genre.name }}</p>
  </div>
</template>

<script>
import GenreController from '../../controllers/GenreController'

export default {
  name: 'Genres',
  data () {
    return {
      genres: '',
      error: null
    }
  },
  methods: {
    async all () {
      console.log('ALL')
      try {
        const response = await GenreController.all()
        this.genres = response.data.data
        console.log('data', response)
      } catch (error) {
        this.error = error.response.data.error
        console.log('err', this.error)
      }
    }
  },
  mounted () {
    this.all()
  }
}
</script>

<style scoped>

</style>
