<template>
  <v-card class="pa-5" flat>
    <v-subheader class="pl-0">Format</v-subheader>
    <v-row align="center">
      <v-col cols="3" class="py-0"><v-subheader>Guest</v-subheader></v-col>
      <v-col cols="6" class="py-0">
        <v-row class="align-center ma-0">
          <v-btn
            slot="activator"
            :color="avatar ? 'primary' : 'grey darken-1'"
            text
            icon
            @click="avatar = !avatar"
          >
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
          <v-text-field
            v-model="color"
            class="color mt-0 pt-0"
            type="color"
            hide-details
          />
        </v-row>
      </v-col>
      <v-col cols="3" class="py-0">
        <v-select
          v-model="style"
          :items="styles"
          hide-details
          class="mt-0 pt-0"
        />
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="3" class="py-0"><v-subheader>Member</v-subheader></v-col>
      <v-col cols="6" class="py-0">
        <v-row class="align-center ma-0">
          <v-btn
            slot="activator"
            :color="memberAvatar ? 'primary' : 'grey darken-1'"
            text
            icon
            @click="memberAvatar = !memberAvatar"
          >
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
          <v-text-field
            v-model="memberColor"
            class="color mt-0 pt-0"
            type="color"
            hide-details
          />
        </v-row>
      </v-col>
      <v-col cols="3" class="py-0">
        <v-select
          v-model="memberStyle"
          :items="styles"
          hide-details
          class="mt-0 pt-0"
        />
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="3" class="py-0"><v-subheader>Moderator</v-subheader></v-col>
      <v-col cols="6" class="py-0">
        <v-row class="align-center ma-0">
          <v-btn
            slot="activator"
            :color="moderatorAvatar ? 'primary' : 'grey darken-1'"
            text
            icon
            @click="moderatorAvatar = !moderatorAvatar"
          >
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
          <v-text-field
            v-model="moderatorColor"
            class="color mt-0 pt-0"
            type="color"
            hide-details
          />
        </v-row>
      </v-col>
      <v-col cols="3" class="py-0">
        <v-select
          v-model="moderatorStyle"
          :items="styles"
          hide-details
          class="mt-0 pt-0"
        />
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="3" class="py-0"><v-subheader>Owner</v-subheader></v-col>
      <v-col cols="6" class="py-0">
        <v-row class="align-center ma-0">
          <v-btn
            slot="activator"
            :color="ownerAvatar ? 'primary' : 'grey darken-1'"
            text
            icon
            @click="ownerAvatar = !ownerAvatar"
          >
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
          <v-text-field
            v-model="ownerColor"
            class="color mt-0 pt-0"
            type="color"
            hide-details
          />
        </v-row>
      </v-col>
      <v-col cols="3" class="py-0">
        <v-select
          v-model="ownerStyle"
          :items="styles"
          hide-details
          class="mt-0 pt-0"
        />
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="3" class="py-0"><v-subheader>You</v-subheader></v-col>
      <v-col cols="6" class="py-0">
        <v-row class="align-center ma-0">
          <v-btn
            slot="activator"
            :color="yourAvatar ? 'primary' : 'grey darken-1'"
            text
            icon
            @click="yourAvatar = !yourAvatar"
          >
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
          <v-text-field
            v-model="yourColor"
            class="color mt-0 pt-0"
            type="color"
            hide-details
          />
        </v-row>
      </v-col>
      <v-col cols="3" class="py-0">
        <v-select
          v-model="yourStyle"
          :items="styles"
          hide-details
          class="mt-0 pt-0"
        />
      </v-col>
    </v-row>
    <v-subheader class="pl-0">Visibility</v-subheader>
    <v-row align="center">
      <v-col cols="3" class="py-0"><v-subheader>Super Chat</v-subheader></v-col>
      <v-col cols="9" class="py-0">
        <v-btn
          slot="activator"
          :color="superChatHidden ? 'grey darken-1' : 'primary'"
          text
          icon
          @click="superChatHidden = !superChatHidden"
        >
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="3" class="py-0">
        <v-subheader>Super Sticker</v-subheader>
      </v-col>
      <v-col cols="9" class="py-0">
        <v-btn
          slot="activator"
          :color="superStickerHidden ? 'grey darken-1' : 'primary'"
          text
          icon
          @click="superStickerHidden = !superStickerHidden"
        >
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="3" class="py-0"><v-subheader>Membership</v-subheader></v-col>
      <v-col cols="9" class="py-0">
        <v-btn
          slot="activator"
          :color="membershipHidden ? 'grey darken-1' : 'primary'"
          text
          icon
          @click="membershipHidden = !membershipHidden"
        >
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </v-col>
    </v-row>
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
    <v-select v-model="overflow" :items="overflows" label="Message Overflow" />
    <v-textarea
      v-model="extendedStyle"
      :placeholder="placeholder.extendedStyle"
      label="Extended Style"
      rows="1"
      auto-grow
    />
    <v-btn class="mt-3" depressed block @click="onResetClick">
      Reset Settings to Default
    </v-btn>
  </v-card>
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
    yourColor: {
      get() {
        return this.$store.state.yourColor
      },
      set(value) {
        this.$store.commit('setYourColor', { yourColor: value })
      }
    },
    yourAvatar: {
      get() {
        return this.$store.state.yourAvatar
      },
      set(value) {
        this.$store.commit('setYourAvatar', { yourAvatar: value })
      }
    },
    yourStyle: {
      get() {
        return this.$store.state.yourStyle
      },
      set(value) {
        this.$store.commit('setYourStyle', { yourStyle: value })
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
    extendedStyle: {
      get() {
        return this.$store.state.extendedStyle
      },
      set(value) {
        this.$store.commit('setExtendedStyle', {
          extendedStyle: value
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

<style scoped>
.color >>> .v-input__slot:before,
.color >>> .v-input__slot:after {
  border: none !important;
}
.color >>> input {
  cursor: pointer;
  height: 32px;
  padding: 0;
}
</style>
