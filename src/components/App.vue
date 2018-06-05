<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-switch
          v-model="enabled"
          label="Enabled"
        />
        <v-subheader class="pl-0">Comment</v-subheader>
        <v-layout row>
          <v-flex xs6>
            <v-subheader class="pl-0">Color</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-model="color"
              placeholder="white"
            />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs6>
            <v-subheader class="pl-0">Text Shadow</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-model="textShadow"
              placeholder="1px 1px 2px #333"
            />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs6>
            <v-subheader class="pl-0">Rows</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-model="rows"
              placeholder="12"
            />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs6>
            <v-subheader class="pl-0">Speed<small class="pl-1">(sec)</small></v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-model="speed"
              placeholder="5"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  computed: {
    enabled: {
      get () {
        return this.$store.state.enabled
      },
      set (value) {
        this.$store.dispatch('setEnabled', { enabled: value })
      }
    },
    color: {
      get () {
        return this.$store.state.color
      },
      set (value) {
        this.$store.dispatch('setColor', { color: value })
      }
    },
    textShadow: {
      get () {
        return this.$store.state.textShadow
      },
      set (value) {
        this.$store.dispatch('setTextShadow', { textShadow: value })
      }
    },
    rows: {
      get () {
        return this.$store.state.rows
      },
      set (value) {
        this.$store.dispatch('setRows', { rows: value })
      }
    },
    speed: {
      get () {
        return this.$store.state.speed
      },
      set (value) {
        this.$store.dispatch('setSpeed', { speed: value })
      }
    }
  },
  async mounted () {
    await this.$store.dispatch('init')
  }
}
</script>

<style>
@import '~vuetify/dist/vuetify.min.css';
</style>

<style scoped>
.application {
  min-width: 300px;
}
</style>
