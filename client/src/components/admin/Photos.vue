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
        <v-btn slot="activator" color="primary" dark class="mb-2">New Photo</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <!--<v-flex xs12 sm6 md4>-->
                  <!--<v-text-field v-model="tempName" label="Photo name"></v-text-field>-->
                  <!--<v-text-field label="Select Image"-->
                                <!--prepend-icon='attach_file'>-->

                  <!--</v-text-field>-->
                  <!--<input-->
                          <!--type="file"-->
                          <!--@change="onFileSelected"-->
                  <!--&gt;-->
                  <!--<v-btn @click="onUpload">Upload</v-btn>-->
                <!--</v-flex>-->
                <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                  <img :src="imageUrl" height="150" v-if="imageUrl"/>
                  <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
                  <input
                          type="file"
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
      editedIndex: -1
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New photo' : 'Edit Photo'
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
    }
  }
}
</script>

<style scoped>

</style>
