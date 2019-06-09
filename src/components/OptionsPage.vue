<template>
  <v-app>
    <v-content>
      <v-container class="pa-0" fluid>
        <v-card class="pa-3" flat>
          <v-subheader class="pl-0">Message</v-subheader>
          <v-layout row align-center>
            <v-flex xs3><v-subheader>Guest</v-subheader></v-flex>
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
            <v-flex xs3 pl-3>
              <v-select
                v-model="style"
                :items="styles"
                hide-details
                class="mt-0 pt-0"
              />
            </v-flex>
          </v-layout>
          <v-layout row align-center>
            <v-flex xs3><v-subheader>Member</v-subheader></v-flex>
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
            <v-flex xs3 pl-3>
              <v-select
                v-model="memberStyle"
                :items="styles"
                hide-details
                class="mt-0 pt-0"
              />
            </v-flex>
          </v-layout>
          <v-layout row align-center>
            <v-flex xs3><v-subheader>Moderator</v-subheader></v-flex>
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
            <v-flex xs3 pl-3>
              <v-select
                v-model="moderatorStyle"
                :items="styles"
                hide-details
                class="mt-0 pt-0"
              />
            </v-flex>
          </v-layout>
          <v-layout row align-center>
            <v-flex xs3><v-subheader>Owner</v-subheader></v-flex>
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
            <v-flex xs3 pl-3>
              <v-select
                v-model="ownerStyle"
                :items="styles"
                hide-details
                class="mt-0 pt-0"
              />
            </v-flex>
          </v-layout>
          <v-layout row align-center>
            <v-flex xs3><v-subheader>Myself</v-subheader></v-flex>
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
            <v-flex xs3 pl-3>
              <v-select
                v-model="myStyle"
                :items="styles"
                hide-details
                class="mt-0 pt-0"
              />
            </v-flex>
          </v-layout>
          <v-layout row align-center>
            <v-flex xs3><v-subheader>Super Chat</v-subheader></v-flex>
            <v-flex xs6>
              <v-tooltip left>
                <v-btn
                  slot="activator"
                  :color="superChatHidden ? 'grey darken-1' : 'primary'"
                  flat
                  icon
                  @click="superChatHidden = !superChatHidden"
                >
                  <v-icon>visibility</v-icon>
                </v-btn>
                <span>Show Message</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
          <v-layout row align-center>
            <v-flex xs3><v-subheader>Super Sticker</v-subheader></v-flex>
            <v-flex xs6>
              <v-tooltip left>
                <v-btn
                  slot="activator"
                  :color="superStickerHidden ? 'grey darken-1' : 'primary'"
                  flat
                  icon
                  @click="superStickerHidden = !superStickerHidden"
                >
                  <v-icon>visibility</v-icon>
                </v-btn>
                <span>Show Message</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
          <v-layout row align-center>
            <v-flex xs3><v-subheader>Membership</v-subheader></v-flex>
            <v-flex xs6>
              <v-tooltip left>
                <v-btn
                  slot="activator"
                  :color="membershipHidden ? 'grey darken-1' : 'primary'"
                  flat
                  icon
                  @click="membershipHidden = !membershipHidden"
                >
                  <v-icon>visibility</v-icon>
                </v-btn>
                <span>Show Message</span>
              </v-tooltip>
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
            label="Message Overflow"
          />
          <v-select
            v-model="textStyle"
            :items="textStyles"
            label="Text Style"
          />
          <v-textarea
            v-model="extendedStyle"
            :placeholder="placeholder.extendedStyle"
            label="Extended Style"
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
        extendedStyle: 'font-family: "Yu Gothic", YuGothic, Meiryo;'
      },
      overflows: [
        { text: 'Hidden', value: 'hidden' },
        { text: 'Overlay', value: 'overlay' }
      ],
      textStyles: [
        { text: 'None', value: 'none' },
        { text: 'Outline', value: 'outline' },
        { text: 'Shadow', value: 'shadow' }
      ],
      styles: [
        { text: 'Simple', value: 'simple' },
        { text: '2 lines', value: 'two-line' }
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
    style: {
      get() {
        return this.$store.state.style
      },
      set(value) {
        this.$store.commit('setStyle', { style: value })
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
    memberStyle: {
      get() {
        return this.$store.state.memberStyle
      },
      set(value) {
        this.$store.commit('setMemberStyle', { memberStyle: value })
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
    moderatorStyle: {
      get() {
        return this.$store.state.moderatorStyle
      },
      set(value) {
        this.$store.commit('setModeratorStyle', { moderatorStyle: value })
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
    ownerStyle: {
      get() {
        return this.$store.state.ownerStyle
      },
      set(value) {
        this.$store.commit('setOwnerStyle', { ownerStyle: value })
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
    myStyle: {
      get() {
        return this.$store.state.myStyle
      },
      set(value) {
        this.$store.commit('setMyStyle', { myStyle: value })
      }
    },
    superChatHidden: {
      get() {
        return this.$store.state.superChatHidden
      },
      set(value) {
        this.$store.commit('setSuperChatHidden', {
          superChatHidden: value
        })
      }
    },
    superStickerHidden: {
      get() {
        return this.$store.state.superStickerHidden
      },
      set(value) {
        this.$store.commit('setSuperStickerHidden', {
          superStickerHidden: value
        })
      }
    },
    membershipHidden: {
      get() {
        return this.$store.state.membershipHidden
      },
      set(value) {
        this.$store.commit('setMembershipHidden', {
          membershipHidden: value
        })
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
    extendedStyle: {
      get() {
        return this.$store.state.extendedStyle
      },
      set(value) {
        this.$store.commit('setExtendedStyle', {
          extendedStyle: value
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
