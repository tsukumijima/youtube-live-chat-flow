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
              type="number"
              min="1"
              max="20"
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
              type="number"
              min="1"
              max="10"
              step="0.1"
            />
          </v-flex>
        </v-layout>
        <v-btn
          flat
          block
          @click="reset"
        >Reset</v-btn>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    enabled: {
      get () {
        return this.$store.state.enabled
      },
      set (value) {
        this.$store.commit('setEnabled', { enabled: value })
      }
    },
    color: {
      get () {
        return this.$store.state.color
      },
      set (value) {
        this.$store.commit('setColor', { color: value })
      }
    },
    textShadow: {
      get () {
        return this.$store.state.textShadow
      },
      set (value) {
        this.$store.commit('setTextShadow', { textShadow: value })
      }
    },
    rows: {
      get () {
        return this.$store.state.rows
      },
      set (value) {
        this.$store.commit('setRows', { rows: value })
      }
    },
    speed: {
      get () {
        return this.$store.state.speed
      },
      set (value) {
        this.$store.commit('setSpeed', { speed: value })
      }
    }
  },
  async mounted () {
    await this.$store.dispatch('initialize')
  },
  methods: {
    ...mapActions({
      reset: 'reset'
    })
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
