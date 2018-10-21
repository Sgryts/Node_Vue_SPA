<template>
  <v-navigation-drawer
    :mini-variant.sync="mini"
    v-model="drawer"
    hide-overlay
    stateless
  >
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <!--<img src="https://randomuser.me/api/portraits/men/85.jpg">-->
            <img src="../../assets/img/default.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn
              icon
              @click.stop="mini = !mini"
            >
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile>
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-action>
          <v-icon>camera</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Photos</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-action>
          <v-icon>color_lens</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>
            <v-btn :to="({name: 'genres'})">Genres</v-btn>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-action>
          <v-icon>fingerprint</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Profile</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'SideControl',
  data () {
    return {
      // UI
      drawer: true,
      mini: true,
      right: null
    }
  }
}

</script>

<style scoped>

</style>
