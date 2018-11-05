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

        <input type="file" @change="onFileChanged">
        <button @click="onUpload">Upload!</button>

      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">Upload Photo</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                  <img
                          :src="imageUrl"
                          height="150"
                          v-if="imageUrl"
                  />
                  <v-text-field v-model="tempName" label="Photo name"></v-text-field>
                  <v-text-field
                          label="Select Image"
                          @click='pickFile'
                          v-model='imageName'
                          prepend-icon='attach_file'
                  ></v-text-field>
                  <input
                          type="file"
                          name="myImage"
                          style="display: none"
                          ref="image"
                          accept="image/*"
                          @change="onFilePicked"
                  >
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
import PhotoController from '../../controllers/PhotoController'

export default {
  name: 'Photos',
  data () {
    return {
      photos: [],
      name: '',
      error: null,

      selectedFile: null,

      //
      imageName: null,
      imageUrl: null,
      imageFile: null,
      //

      tempItem: null,
      tempName: null,

      dialog: false,
      headers: [
        {
          text: 'Photo Name',
          align: 'left',
          sortable: false,
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

  methods: {
    //
    onFileChanged (event) {
      const file = event.target.files[0]
      console.log('FILE', file)
    },
    onUpload () {
      // upload file
    },
    //
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
          this.post(this.imageFile)
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

    async post (data) {
      try {
        console.log('photo', data)
        await PhotoController.post(data)
      } catch (error) {
        this.error = error.response.data.error
        console.log('err', this.error)
      }
    },

    // TABLE
    editItem (item) {
      this.tempItem = Object.assign({}, item)
      this.tempName = this.tempItem.name
      //
      this.edited = true
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.photos.indexOf(item)
      confirm('Are you sure you want to delete this photo?') && this.photos.splice(index, 1)
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
        this.put(this.tempItem._id, this.tempName)
        this.edited = false
      } else {
        // new
        if (this.tempName) {
          console.log('add')
          this.post(this.tempName)
          console.log('added->', this.tempName)
          this.photos.push(this.tempName)
        } else {
          // TODO: build FE validation service
          console.log('Cannot be empty')
        }
      }
      this.close()
      this.tempItem = null
      this.tempName = null
    }
  }
}
</script>

<style scoped>

</style>
