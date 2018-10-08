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
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="tempName" label="Photo name"></v-text-field>
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
        slot-scope="photos"
      >
        <td v-for="(photo) in photos"
            :key="photo._id">
          {{ photo.name }}
          <v-icon
            small
            class="mr-2"
            @click="editItem(photo)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(photo)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
// import PhotoController from '../../controllers/PhotoController'

export default {
  name: 'Photos',
  data () {
    return {
      photos: [],
      name: '',
      error: null,

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
        {text: 'Actions', value: 'name', sortable: false}
      ],
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
  }
}
</script>

<style scoped>

</style>
