<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-subheader class="pl-0">Avatar &amp; Color</v-subheader>
        <v-layout row align-center>
          <v-flex xs6><v-subheader>Guest</v-subheader></v-flex>
          <v-flex xs6>
            <v-layout class="align-center">
              <v-tooltip left>
                <v-btn
                  slot="activator"
                  :color="avatar ? 'primary' : 'grey darken-1'"
                  flat
                  icon
                  @click="avatar = !avatar"
                >
                  <v-icon>account_circle</v-icon>
                </v-btn>
                <span>Show Avatar</span>
              </v-tooltip>
              <v-text-field
                v-model="color"
                class="color mt-0 pt-0"
                type="color"
                hide-details
              />
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout row align-center>
          <v-flex xs6><v-subheader>Member</v-subheader></v-flex>
          <v-flex xs6>
            <v-layout class="align-center">
              <v-tooltip left>
                <v-btn
                  slot="activator"
                  :color="memberAvatar ? 'primary' : 'grey darken-1'"
                  flat
                  icon
                  @click="memberAvatar = !memberAvatar"
                >
                  <v-icon>account_circle</v-icon>
                </v-btn>
                <span>Show Avatar</span>
              </v-tooltip>
              <v-text-field
                v-model="memberColor"
                class="color mt-0 pt-0"
                type="color"
                hide-details
              />
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout row align-center>
          <v-flex xs6><v-subheader>Moderator</v-subheader></v-flex>
          <v-flex xs6>
            <v-layout class="align-center">
              <v-tooltip left>
                <v-btn
                  slot="activator"
                  :color="moderatorAvatar ? 'primary' : 'grey darken-1'"
                  flat
                  icon
                  @click="moderatorAvatar = !moderatorAvatar"
                >
                  <v-icon>account_circle</v-icon>
                </v-btn>
                <span>Show Avatar</span>
              </v-tooltip>
              <v-text-field
                v-model="moderatorColor"
                class="color mt-0 pt-0"
                type="color"
                hide-details
              />
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout row align-center>
          <v-flex xs6><v-subheader>Owner</v-subheader></v-flex>
          <v-flex xs6>
            <v-layout class="align-center">
              <v-tooltip left>
                <v-btn
                  slot="activator"
                  :color="ownerAvatar ? 'primary' : 'grey darken-1'"
                  flat
                  icon
                  @click="ownerAvatar = !ownerAvatar"
                >
                  <v-icon>account_circle</v-icon>
                </v-btn>
                <span>Show Avatar</span>
              </v-tooltip>
              <v-text-field
                v-model="ownerColor"
                class="color mt-0 pt-0"
                type="color"
                hide-details
              />
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout row align-center>
          <v-flex xs6><v-subheader>Super Chat</v-subheader></v-flex>
          <v-flex xs6>
            <v-layout class="align-center">
              <v-tooltip left>
                <v-btn
                  slot="activator"
                  :color="paidAvatar ? 'primary' : 'grey darken-1'"
                  flat
                  icon
                  @click="paidAvatar = !paidAvatar"
                >
                  <v-icon>account_circle</v-icon>
                </v-btn>
                <span>Show Avatar</span>
              </v-tooltip>
              <v-text-field
                v-model="paidColor"
                class="color mt-0 pt-0"
                type="color"
                hide-details
              />
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout row align-center>
          <v-flex xs6><v-subheader>Self</v-subheader></v-flex>
          <v-flex xs6>
            <v-layout class="align-center">
              <v-tooltip left>
                <v-btn
                  slot="activator"
                  :color="selfAvatar ? 'primary' : 'grey darken-1'"
                  flat
                  icon
                  @click="selfAvatar = !selfAvatar"
                >
                  <v-icon>account_circle</v-icon>
                </v-btn>
                <span>Show Avatar</span>
              </v-tooltip>
              <v-text-field
                v-model="selfColor"
                class="color mt-0 pt-0"
                type="color"
                hide-details
              />
            </v-layout>
          </v-flex>
        </v-layout>
        <v-text-field
          v-model="opacity"
          :placeholder="defaults.opacity"
          label="Opacity"
          type="number"
          min="0"
          max="1"
          step="0.1"
        />
        <v-text-field
          v-model="rows"
          :placeholder="defaults.rows"
          label="Rows"
          type="number"
          min="1"
          max="20"
        />
        <v-text-field
          v-model="speed"
          :placeholder="defaults.speed"
          label="Speed"
          type="number"
          min="1"
          max="10"
          step="0.1"
          suffix="sec"
        />
        <v-select
          v-model="overflow"
          :items="overflows"
          label="Overflow"
          item-text="text"
          item-value="value"
          return-object
        />
        <v-textarea
          v-model="extendedStyle"
          :placeholder="defaults.extendedStyle"
          label="Extended Style"
          rows="1"
          auto-grow
        />
        <v-btn class="mt-3" color="primary" flat block @click="reset">
          Reset
        </v-btn>
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
    avatar: {
      get() {
        return this.$store.state.settings.avatar
      },
      set(value) {
        this.$store.commit('settings/setAvatar', { avatar: value })
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
    memberAvatar: {
      get() {
        return this.$store.state.settings.memberAvatar
      },
      set(value) {
        this.$store.commit('settings/setMemberAvatar', { memberAvatar: value })
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
    moderatorAvatar: {
      get() {
        return this.$store.state.settings.moderatorAvatar
      },
      set(value) {
        this.$store.commit('settings/setModeratorAvatar', {
          moderatorAvatar: value
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
    ownerAvatar: {
      get() {
        return this.$store.state.settings.ownerAvatar
      },
      set(value) {
        this.$store.commit('settings/setOwnerAvatar', { ownerAvatar: value })
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
    paidAvatar: {
      get() {
        return this.$store.state.settings.paidAvatar
      },
      set(value) {
        this.$store.commit('settings/setPaidAvatar', { paidAvatar: value })
      }
    },
    selfColor: {
      get() {
        return this.$store.state.settings.selfColor
      },
      set(value) {
        this.$store.commit('settings/setSelfColor', { selfColor: value })
      }
    },
    selfAvatar: {
      get() {
        return this.$store.state.settings.selfAvatar
      },
      set(value) {
        this.$store.commit('settings/setSelfAvatar', { selfAvatar: value })
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
    },
    extendedStyle: {
      get() {
        return this.$store.state.settings.extendedStyle
      },
      set(value) {
        this.$store.commit('settings/setExtendedStyle', {
          extendedStyle: value
        })
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
