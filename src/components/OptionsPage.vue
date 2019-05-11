<template>
  <v-app>
    <v-content>
      <v-container class="pa-0" fluid>
        <v-card class="pa-3" flat>
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
            <v-flex xs6><v-subheader>Myself</v-subheader></v-flex>
            <v-flex xs6>
              <v-layout class="align-center">
                <v-tooltip left>
                  <v-btn
                    slot="activator"
                    :color="myAvatar ? 'primary' : 'grey darken-1'"
                    flat
                    icon
                    @click="myAvatar = !myAvatar"
                  >
                    <v-icon>account_circle</v-icon>
                  </v-btn>
                  <span>Show Avatar</span>
                </v-tooltip>
                <v-text-field
                  v-model="myColor"
                  class="color mt-0 pt-0"
                  type="color"
                  hide-details
                />
              </v-layout>
            </v-flex>
          </v-layout>
          <v-text-field
            v-model="opacity"
            :placeholder="placeholder.opacity"
            label="Opacity"
            type="number"
            min="0"
            max="1"
            step="0.1"
          />
          <v-text-field
            v-model="rows"
            :placeholder="placeholder.rows"
            :label="`Height (Video Height / ${rows})`"
            type="number"
            min="1"
            max="20"
          />
          <v-text-field
            v-model="speed"
            :placeholder="placeholder.speed"
            label="Display Time"
            type="number"
            min="1"
            max="10"
            step="0.1"
            suffix="sec"
          />
          <v-select
            v-model="overflow"
            :items="overflows"
            label="Overflow Mode"
          />
          <v-select
            v-model="textStyle"
            :items="textStyles"
            label="Text Style"
          />
          <v-textarea
            v-model="extendedTextStyle"
            :placeholder="placeholder.extendedTextStyle"
            label="Extended Text Style"
            rows="1"
            auto-grow
          />
          <v-switch
            v-model="bottomControllerEnabled"
            label="Enable Bottom Controller"
          />
          <v-btn class="mt-3" depressed block @click="onResetClick">
            Reset Settings to Default
          </v-btn>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      placeholder: {
        opacity: '0.8',
        rows: '12',
        speed: '5',
        extendedTextStyle: 'font-family: "Yu Gothic", YuGothic, Meiryo;'
      },
      overflows: [
        { text: 'Hidden', value: 'hidden' },
        { text: 'Overlay', value: 'overlay' }
      ],
      textStyles: [
        { text: 'None', value: 'none' },
        { text: 'Outline', value: 'outline' },
        { text: 'Shadow', value: 'shadow' }
      ]
    }
  },
  computed: {
    color: {
      get() {
        return this.$store.state.color
      },
      set(value) {
        this.$store.commit('setColor', { color: value })
      }
    },
    avatar: {
      get() {
        return this.$store.state.avatar
      },
      set(value) {
        this.$store.commit('setAvatar', { avatar: value })
      }
    },
    memberColor: {
      get() {
        return this.$store.state.memberColor
      },
      set(value) {
        this.$store.commit('setMemberColor', { memberColor: value })
      }
    },
    memberAvatar: {
      get() {
        return this.$store.state.memberAvatar
      },
      set(value) {
        this.$store.commit('setMemberAvatar', { memberAvatar: value })
      }
    },
    moderatorColor: {
      get() {
        return this.$store.state.moderatorColor
      },
      set(value) {
        this.$store.commit('setModeratorColor', {
          moderatorColor: value
        })
      }
    },
    moderatorAvatar: {
      get() {
        return this.$store.state.moderatorAvatar
      },
      set(value) {
        this.$store.commit('setModeratorAvatar', {
          moderatorAvatar: value
        })
      }
    },
    ownerColor: {
      get() {
        return this.$store.state.ownerColor
      },
      set(value) {
        this.$store.commit('setOwnerColor', { ownerColor: value })
      }
    },
    ownerAvatar: {
      get() {
        return this.$store.state.ownerAvatar
      },
      set(value) {
        this.$store.commit('setOwnerAvatar', { ownerAvatar: value })
      }
    },
    paidColor: {
      get() {
        return this.$store.state.paidColor
      },
      set(value) {
        this.$store.commit('setPaidColor', { paidColor: value })
      }
    },
    paidAvatar: {
      get() {
        return this.$store.state.paidAvatar
      },
      set(value) {
        this.$store.commit('setPaidAvatar', { paidAvatar: value })
      }
    },
    myColor: {
      get() {
        return this.$store.state.myColor
      },
      set(value) {
        this.$store.commit('setMyColor', { myColor: value })
      }
    },
    myAvatar: {
      get() {
        return this.$store.state.myAvatar
      },
      set(value) {
        this.$store.commit('setMyAvatar', { myAvatar: value })
      }
    },
    opacity: {
      get() {
        return this.$store.state.opacity
      },
      set(value) {
        this.$store.commit('setOpacity', { opacity: value })
      }
    },
    rows: {
      get() {
        return this.$store.state.rows
      },
      set(value) {
        this.$store.commit('setRows', { rows: value })
      }
    },
    speed: {
      get() {
        return this.$store.state.speed
      },
      set(value) {
        this.$store.commit('setSpeed', { speed: value })
      }
    },
    overflow: {
      get() {
        return this.$store.state.overflow
      },
      set(value) {
        this.$store.commit('setOverflow', { overflow: value })
      }
    },
    textStyle: {
      get() {
        return this.$store.state.textStyle
      },
      set(value) {
        this.$store.commit('setTextStyle', { textStyle: value })
      }
    },
    extendedTextStyle: {
      get() {
        return this.$store.state.extendedTextStyle
      },
      set(value) {
        this.$store.commit('setExtendedTextStyle', {
          extendedTextStyle: value
        })
      }
    },
    bottomControllerEnabled: {
      get() {
        return this.$store.state.bottomControllerEnabled
      },
      set(value) {
        this.$store.commit('setBottomControllerEnabled', {
          bottomControllerEnabled: value
        })
      }
    }
  },
  methods: {
    onResetClick() {
      this.resetState()
    },
    ...mapMutations(['resetState'])
  }
}
</script>

<style>
@import '~vuetify/dist/vuetify.min.css';
</style>

<style scoped>
.application {
  min-width: 512px;
}
.color >>> .v-input__slot:before,
.color >>> .v-input__slot:after {
  border: none;
}
.color >>> input {
  cursor: pointer;
  height: 32px;
  padding: 0;
}
</style>
