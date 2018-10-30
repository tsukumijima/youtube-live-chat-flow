<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-subheader class="pl-0">Color</v-subheader>
        <v-layout
          row
          align-center
        >
          <v-flex xs6>
            <v-subheader>Guest</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-model="color"
              class="color"
              type="color"
              hide-details
            />
          </v-flex>
        </v-layout>
        <v-layout
          row
          align-center
        >
          <v-flex xs6>
            <v-subheader>Member</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-model="memberColor"
              class="color"
              type="color"
              hide-details
            />
          </v-flex>
        </v-layout>
        <v-layout
          row
          align-center
        >
          <v-flex xs6>
            <v-subheader>Moderator</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-model="moderatorColor"
              class="color"
              type="color"
              hide-details
            />
          </v-flex>
        </v-layout>
        <v-layout
          row
          align-center
        >
          <v-flex xs6>
            <v-subheader>Owner</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-model="ownerColor"
              class="color"
              type="color"
              hide-details
            />
          </v-flex>
        </v-layout>
        <v-layout
          row
          align-center
        >
          <v-flex xs6>
            <v-subheader>Super Chat</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-model="paidColor"
              class="color"
              type="color"
              hide-details
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
              hide-details
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
              hide-details
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
              hide-details
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
              hide-details
            />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs6>
            <v-subheader class="pl-0">Message Overflow</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              v-model="overflow"
              :items="overflows"
              item-text="text"
              item-value="value"
              return-object
            />
          </v-flex>
        </v-layout>
        <v-btn
          class="mt-3"
          color="primary"
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
  data() {
    return {
      defaults,
      overflows: [
        { text: 'Hidden', value: 'hidden' },
        { text: 'Overlay', value: 'overlay' }
      ]
    }
  },
  computed: {
    color: {
      get() {
        return this.$store.state.settings.color
      },
      set(value) {
        this.$store.commit('settings/setColor', { color: value })
      }
    },
    memberColor: {
      get() {
        return this.$store.state.settings.memberColor
      },
      set(value) {
        this.$store.commit('settings/setMemberColor', { memberColor: value })
      }
    },
    moderatorColor: {
      get() {
        return this.$store.state.settings.moderatorColor
      },
      set(value) {
        this.$store.commit('settings/setModeratorColor', {
          moderatorColor: value
        })
      }
    },
    ownerColor: {
      get() {
        return this.$store.state.settings.ownerColor
      },
      set(value) {
        this.$store.commit('settings/setOwnerColor', { ownerColor: value })
      }
    },
    paidColor: {
      get() {
        return this.$store.state.settings.paidColor
      },
      set(value) {
        this.$store.commit('settings/setPaidColor', { paidColor: value })
      }
    },
    textShadow: {
      get() {
        return this.$store.state.settings.textShadow
      },
      set(value) {
        this.$store.commit('settings/setTextShadow', { textShadow: value })
      }
    },
    opacity: {
      get() {
        return this.$store.state.settings.opacity
      },
      set(value) {
        this.$store.commit('settings/setOpacity', { opacity: value })
      }
    },
    rows: {
      get() {
        return this.$store.state.settings.rows
      },
      set(value) {
        this.$store.commit('settings/setRows', { rows: value })
      }
    },
    speed: {
      get() {
        return this.$store.state.settings.speed
      },
      set(value) {
        this.$store.commit('settings/setSpeed', { speed: value })
      }
    },
    overflow: {
      get() {
        return { value: this.$store.state.settings.overflow }
      },
      set(value) {
        this.$store.commit('settings/setOverflow', { overflow: value.value })
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('initialize')
  },
  methods: {
    close() {
      window.close()
    },
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
  min-width: 480px;
}
.color >>> .v-input__slot:before {
  height: 0;
}
.color >>> .v-input__slot:after {
  height: 0;
}
.color >>> input {
  cursor: pointer;
  height: 32px;
  padding: 0;
}
</style>
