<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Genres</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator"
               color="primary"
               dark class="mb-2"
        >
          New Genre
        </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="tempName" label="Genre name"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save(tempName)">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="genres"
      hide-actions
      class="elevation-1"
    >
      <template
        slot="items"
        slot-scope="genres"
      >
        <td v-for="(genre) in genres"
             :key="genre._id">
            {{ genre.name }}
            <v-icon
              small
              class="mr-2"
              @click="editItem(genre)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(genre)"
            >
              delete
            </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import GenreController from '../../controllers/GenreController'

export default {
  name: 'Genres',
  data () {
    return {
      genres: [],
      error: null,

      tempItem: null,
      tempName: null,

      dialog: false,
      headers: [
        {
          text: 'Genre Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {text: 'Actions', value: 'name', sortable: false}
      ],
      edited: false
    }
  },
  computed: {
    formTitle () {
      return this.edited ? 'Edit Genre' : 'New Genre'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.all()
  },
  methods: {
    // CRUD
    async all () {
      console.log('ALL')
      try {
        const response = await GenreController.all()
        this.genres = await response.data.data
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
    async add (data) {
      console.log('ADD', data)
      try {
        const response = await GenreController.add({
          name: data
        })
        // this.genres = response.data.data
        console.log('genre', response.data.data)
      } catch (error) {
        this.error = error.response.data.error
        console.log('err', this.error)
      }
    },
    async update (id, data) {
      console.log('UPDATE', id, data)
      try {
        const response = await GenreController.update(id, {
          name: data
        })
        // this.genres = response.data.data
        console.log('genre', response.data.data)
      } catch (error) {
        this.error = error
        console.log('err', this.error)
      }
    },
    async destroy (id) {
      console.log('DELETE')
      try {
        const response = await GenreController.destroy(id)
        console.log('genre', response.data.data)
      } catch (error) {
        this.error = error.response.data.error
        console.log('err', this.error)
      }
    },
    // Table
    editItem (item) {
      this.tempItem = Object.assign({}, item)
      this.tempName = this.tempItem.name
      //
      this.edited = true
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.genres.indexOf(item)
      confirm('Are you sure you want to delete this genre?') && this.genres.splice(index, 1)
      console.log('ID', item._id)
      this.destroy(item._id)
    },

    close () {
      this.dialog = false
      this.edited = false
    },
    // 1.if current item  => edited, if null => save new item
    // 2. Or build new buttons : add and update
    // 3. on ADD vue will rerender array
    // 4. rerender items after each update with vue.set (check by VUE INDEX)
    // 5. array find() element, update and display after update

    save () {
      if (this.edited) {
        // update
        console.log('edit')
        console.log('EDITED->', this.tempItem._id, this.tempName)
        this.update(this.tempItem._id, this.tempName)
        this.edited = false
      } else {
        // new
        if (this.tempName) {
          console.log('add')
          this.add(this.tempName)
          console.log('added->', this.tempName)
          this.genres.push(this.tempName)
        } else {
          // TODO: build FE validation service
          console.log('Cannot be empty')
        }
      }
      this.close()
      this.tempItem = null
      this.tempName = null
    }
  },
  //

  mounted () {
    // this.show()
    // this.add()
  }
}
</script>

<style scoped>

</style>
