<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Photos</v-toolbar-title>
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
          Upload Photo
        </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12
                        class="text-xs-center text-sm-center text-md-center text-lg-center"
                >
                  <img
                          :src="imageUrl"
                          height="150"
                          v-if="imageUrl"
                  />
                  <v-text-field
                          v-model="tempName"
                          label="Photo name"
                  ></v-text-field>
                  <div v-if="!edited">
                    <v-text-field
                            label="Select Image"
                            @click='pickFile'
                            v-model='imageName'
                            prepend-icon='attach_file'
                    ></v-text-field>
                    <input
                            type="file"
                            style="display: none"
                            name="image"
                            ref="image"
                            accept="image/*"
                            @change="onFilePicked"
                    >
                  </div>
                    <div>
                      <label class="typo__label">
                        Genres
                      </label>
                      <multiselect
                              v-model="value"
                              tag-placeholder="Add this as new tag"
                              placeholder="Search or add a genre"
                              label="name"
                              track-by="code"
                              :options="genres"
                              :multiple="true"
                              :taggable="true"
                              @tag="addTag"
                      ></multiselect>
                    </div>
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
            :items="photos"
            hide-actions
            class="elevation-1"
    >
      <template
              slot="items"
              slot-scope="props"
      >
        <!--<td><img v-bind:src="`../../server/src/uploads/img/${props.item.path}`" alt=""></td>-->
        <td>{{props.item.name}}</td>
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
import Multiselect from 'vue-multiselect'
import PhotoController from '../../controllers/PhotoController'
import GenreController from '../../controllers/GenreController'

export default {
  components: {Multiselect},
  name: 'Photos',
  data () {
    return {

      // multiselect
      value: [
        // { name: 'Javascript', code: 'js' }
      ],
      genres: [],

      photos: [],
      // name: '',
      error: null,

      selectedFile: null,

      // img upload
      imageName: null,
      imageUrl: null,
      imageFile: null,
      //

      tempItem: null,
      tempName: null,
      tempIndex: null,

      dialog: false,
      headers: [
        {
          text: 'Photo Name',
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
      return this.edited ? 'Update Photo' : 'Upload photo'
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
  mounted () {
    this.getGenres()
  },
  methods: {
    // multiselect
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.genres.push(tag)
      this.value.push(tag)
    },
    // IMG UPLOAD
    pickFile () {
      this.$refs.image.click()
    },
    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          // img to store
          this.imageFile = files[0]
        })
      } else {
        this.imageName = null
        this.imageFile = null
        this.imageUrl = null
      }
    },
    // CRUD
    async index () {
      try {
        const response = await PhotoController.index()
        this.photos = await response.data.data
        console.log('data', this.photos)
      } catch (error) {
        this.error = error.response.data.error
        console.log('err', this.error)
      }
    },
    async show (id) {
      try {
        const response = await PhotoController.show(id)
        response.data.data.genres.forEach(genre => this.value.push({name: genre.name, code: genre._id}))
      } catch (error) {
        this.error = error.response.data.error
        console.log('err', this.error)
      }
    },
    async post () {
      try {
        const formData = new FormData()
        const genres = JSON.stringify(this.value.map(val => val.code))
        formData.append('image', this.imageFile)
        formData.append('name', this.tempName)
        formData.append('genres', genres)

        const response = await PhotoController.post(formData)
        this.photos.push(await response.data.data)
      } catch (error) {
        this.error = error.response.data.error
        console.log('err', this.error)
      }
    },
    async put (id, data) {
      try {
        const response = await PhotoController.put(id, {
          name: data.name,
          genres: data.genres
        })
        console.log('photo', response.data.data)
      } catch (error) {
        this.error = error
        console.log('err', this.error)
      }
    },
    async destroy (id) {
      console.log('DELETE')
      try {
        const response = await PhotoController.destroy(id)
        console.log('photo', response.data.data)
      } catch (error) {
        this.error = error.response.data.error
        console.log('err', this.error)
      }
    },
    async getGenres () {
      try {
        const response = await GenreController.index()
        await response.data.data.forEach(genre => this.genres.push({name: genre.name, code: genre._id}))
      } catch (error) {
        this.error = error.response.data.error
        console.log('err', this.error)
      }
    },
    // TABLE
    editItem (item) {
      this.tempItem = Object.assign({}, item)
      this.tempIndex = this.photos.indexOf(item)
      this.tempName = this.tempItem.name
      //
      this.edited = true
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.photos.indexOf(item)
      confirm('Are you sure you want to delete this photo?') && this.photos.splice(index, 1)
      this.destroy(item._id)
    },

    close () {
      this.dialog = false
      this.edited = false
      this.tempItem = null
      this.tempName = null
      this.imageName = null
      this.imageFile = null
      this.imageUrl = null
      this.value = []
    },
    // 1.if current item  => edited, if null => save new item
    // 2. Or build new buttons : add and update
    // 3. on ADD vue will rerender array
    // 4. rerender items after each update with vue.set (check by VUE INDEX)
    // 5. array find() element, update and display after update

    save () {
      if (this.edited) {
        // update
        console.log('EDITED->',
          this.tempItem._id,
          this.tempName,
          this.value,
          this.imageFile
        )
        const id = this.tempItem._id

        const genres = []
        this.value.forEach(val => genres.push({name: val.name, _id: val.code}))

        const body = {
          name: this.tempName,
          genres: genres
        }
        this.put(id, body)

        this.tempItem.name = this.tempName
        Object.assign(this.photos[this.tempIndex], this.tempItem)

        this.edited = false
      } else {
        // new
        if (this.tempName) {
          console.log('added->',
            this.tempName,
            this.value,
            this.imageFile
          )
          this.post()
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>
