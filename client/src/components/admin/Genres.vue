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
      class="elevation-1 mb-5"
    >
      <template
        slot="items"
        slot-scope="props"
      >
        <td>{{ props.item.name }}</td>
        <td class="justify-center layout px-0">
          <v-icon
                  small
                  class="mr-2"
                  @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
                  small
                  @click="deleteItem(props.item)"
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
      tempIndex: null,

      dialog: false,
      headers: [
        {
          text: 'Genre Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Actions',
          value: 'name',
          sortable: false
        }
      ],
      pagination: {
        sortBy: 'name',
        descending: true
      },
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
    this.index()
  },
  methods: {
    // CRUD
    async index () {
      console.log('ALL')
      try {
        const response = await GenreController.index()
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
    // TODO: ontype check if genre exists and return error
    async post (data) {
      console.log('ADD', data)
      try {
        const response = await GenreController.post({
          name: data
        })
        // this.genres = response.data.data
        console.log('genre', response.data.data)
        this.index()
      } catch (error) {
        this.error = error.response.data.error
        console.log('err', this.error)
      }
    },
    async put (id, data) {
      console.log('UPDATE', id, data)
      try {
        const response = await GenreController.put(id, {
          name: data
        })
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
    // TABLE
    editItem (item) {
      this.tempItem = Object.assign({}, item)
      this.tempIndex = this.genres.indexOf(item)
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
      this.tempItem = null
      this.tempName = null
      this.tempIndex = null
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
        this.tempItem.name = this.tempName
        Object.assign(this.genres[this.tempIndex], this.tempItem)
        this.put(this.tempItem._id, this.tempItem.name)
        this.edited = false
      } else {
        // new
        if (this.tempName) {
          console.log('add')
          this.post(this.tempName)
          console.log('added->', this.tempName)
          this.genres.push(this.tempName)
        } else {
          // TODO: build FE validation service
          console.log('Cannot be empty')
        }
      }
      this.close()
    }
  }
}
</script>

<style scoped>

</style>
