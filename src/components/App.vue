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
              :placeholder="defaults.color"
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
              :placeholder="defaults.textShadow"
            />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs6>
            <v-subheader class="pl-0">Opacity</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-model="opacity"
              :placeholder="defaults.opacity"
              type="number"
              min="0"
              max="1"
              step="0.01"
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
              :placeholder="defaults.rows"
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
              :placeholder="defaults.speed"
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
import { defaults } from '~/store/settings'

export default {
  data () {
    return {
      defaults
    }
  },
  computed: {
    enabled: {
      get () {
        return this.$store.state.settings.enabled
      },
      set (value) {
        this.$store.commit('settings/setEnabled', { enabled: value })
      }
    },
    color: {
      get () {
        return this.$store.state.settings.color
      },
      set (value) {
        this.$store.commit('settings/setColor', { color: value })
      }
    },
    textShadow: {
      get () {
        return this.$store.state.settings.textShadow
      },
      set (value) {
        this.$store.commit('settings/setTextShadow', { textShadow: value })
      }
    },
    opacity: {
      get () {
        return this.$store.state.settings.opacity
      },
      set (value) {
        this.$store.commit('settings/setOpacity', { opacity: value })
      }
    },
    rows: {
      get () {
        return this.$store.state.settings.rows
      },
      set (value) {
        this.$store.commit('settings/setRows', { rows: value })
      }
    },
    speed: {
      get () {
        return this.$store.state.settings.speed
      },
      set (value) {
        this.$store.commit('settings/setSpeed', { speed: value })
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
