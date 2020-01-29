<template>
  <v-card class="pa-5" flat>
    <v-subheader class="pl-0">Style</v-subheader>
    <v-row align="center">
      <v-col cols="3" class="py-0"><v-subheader>Guest</v-subheader></v-col>
      <v-col cols="4" class="py-0">
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
            class="color mt-0 ml-3 pt-0"
            type="color"
            hide-details
          />
        </v-row>
      </v-col>
      <v-col cols="5" class="py-0">
        <v-select
          v-model="style"
          :items="styles"
          dense
          hide-details
          class="mt-0 pt-0 body-2"
        />
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="3" class="py-0"><v-subheader>Member</v-subheader></v-col>
      <v-col cols="4" class="py-0">
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
            class="color mt-0 ml-3 pt-0"
            type="color"
            hide-details
          />
        </v-row>
      </v-col>
      <v-col cols="5" class="py-0">
        <v-select
          v-model="memberStyle"
          :items="styles"
          dense
          hide-details
          class="mt-0 pt-0 body-2"
        />
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="3" class="py-0"><v-subheader>Moderator</v-subheader></v-col>
      <v-col cols="4" class="py-0">
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
            class="color mt-0 ml-3 pt-0"
            type="color"
            hide-details
          />
        </v-row>
      </v-col>
      <v-col cols="5" class="py-0">
        <v-select
          v-model="moderatorStyle"
          :items="styles"
          dense
          hide-details
          class="mt-0 pt-0 body-2"
        />
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="3" class="py-0"><v-subheader>Owner</v-subheader></v-col>
      <v-col cols="4" class="py-0">
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
            class="color mt-0 ml-3 pt-0"
            type="color"
            hide-details
          />
        </v-row>
      </v-col>
      <v-col cols="5" class="py-0">
        <v-select
          v-model="ownerStyle"
          :items="styles"
          dense
          hide-details
          class="mt-0 pt-0 body-2"
        />
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="3" class="py-0"><v-subheader>You</v-subheader></v-col>
      <v-col cols="4" class="py-0">
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
            class="color mt-0 ml-3 pt-0"
            type="color"
            hide-details
          />
        </v-row>
      </v-col>
      <v-col cols="5" class="py-0">
        <v-select
          v-model="yourStyle"
          :items="styles"
          dense
          hide-details
          class="mt-0 pt-0 body-2"
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
    <v-subheader class="pl-0">Behavior</v-subheader>
    <div class="pl-4">
      <v-text-field
        v-model="opacity"
        :placeholder="placeholder.opacity"
        class="mt-3"
        label="Opacity"
        type="number"
        min="0"
        max="1"
        step="0.1"
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
      <v-text-field
        v-model="displays"
        :placeholder="placeholder.displays"
        label="Max Displays (Infinite if set to 0)"
        type="number"
        min="0"
      />
      <v-text-field
        v-model="rows"
        :placeholder="placeholder.rows"
        label="Max Rows"
        type="number"
        min="1"
        max="20"
      />
      <v-select
        v-model="stackDirection"
        :items="stackDirections"
        label="Stack Directions"
      />
      <v-select v-model="overflow" :items="overflows" label="Overflow Mode" />
      <v-textarea
        v-model="extendedStyle"
        :placeholder="placeholder.extendedStyle"
        label="Extended Style"
        rows="1"
        auto-grow
      />
    </div>
    <v-btn class="mt-3" depressed block @click="onResetClick">
      Reset Settings to Default
    </v-btn>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { settingsStore } from '~/store'

@Component
export default class MessageTabItem extends Vue {
  placeholder = {
    opacity: '0.8',
    speed: '5',
    displays: '0',
    rows: '12',
    extendedStyle: 'font-family: "Yu Gothic", YuGothic, Meiryo;'
  }
  styles = [
    { text: '1 line (without author)', value: 'one-line-without-author' },
    { text: '1 line (with author)', value: 'one-line-with-author' },
    { text: '2 lines (with author)', value: 'two-line' }
  ]
  stackDirections = [
    { text: 'Top to Bottom', value: 'top_to_bottom' },
    { text: 'Bottom to Top', value: 'bottom_to_top' }
  ]
  overflows = [
    { text: 'Hidden', value: 'hidden' },
    { text: 'Overlay', value: 'overlay' }
  ]

  get color() {
    return settingsStore.color
  }
  set color(value) {
    settingsStore.setColor({ color: value })
  }

  get avatar() {
    return settingsStore.avatar
  }
  set avatar(value) {
    settingsStore.setAvatar({ avatar: value })
  }

  get style() {
    return settingsStore.style
  }
  set style(value) {
    settingsStore.setStyle({ style: value })
  }

  get memberColor() {
    return settingsStore.memberColor
  }
  set memberColor(value) {
    settingsStore.setMemberColor({ memberColor: value })
  }

  get memberAvatar() {
    return settingsStore.memberAvatar
  }
  set memberAvatar(value) {
    settingsStore.setMemberAvatar({ memberAvatar: value })
  }

  get memberStyle() {
    return settingsStore.memberStyle
  }
  set memberStyle(value) {
    settingsStore.setMemberStyle({ memberStyle: value })
  }

  get moderatorColor() {
    return settingsStore.moderatorColor
  }
  set moderatorColor(value) {
    settingsStore.setModeratorColor({
      moderatorColor: value
    })
  }

  get moderatorAvatar() {
    return settingsStore.moderatorAvatar
  }
  set moderatorAvatar(value) {
    settingsStore.setModeratorAvatar({
      moderatorAvatar: value
    })
  }

  get moderatorStyle() {
    return settingsStore.moderatorStyle
  }
  set moderatorStyle(value) {
    settingsStore.setModeratorStyle({ moderatorStyle: value })
  }

  get ownerColor() {
    return settingsStore.ownerColor
  }
  set ownerColor(value) {
    settingsStore.setOwnerColor({ ownerColor: value })
  }

  get ownerAvatar() {
    return settingsStore.ownerAvatar
  }
  set ownerAvatar(value) {
    settingsStore.setOwnerAvatar({ ownerAvatar: value })
  }

  get ownerStyle() {
    return settingsStore.ownerStyle
  }
  set ownerStyle(value) {
    settingsStore.setOwnerStyle({ ownerStyle: value })
  }

  get yourColor() {
    return settingsStore.yourColor
  }
  set yourColor(value) {
    settingsStore.setYourColor({ yourColor: value })
  }

  get yourAvatar() {
    return settingsStore.yourAvatar
  }
  set yourAvatar(value) {
    settingsStore.setYourAvatar({ yourAvatar: value })
  }

  get yourStyle() {
    return settingsStore.yourStyle
  }
  set yourStyle(value) {
    settingsStore.setYourStyle({ yourStyle: value })
  }

  get superChatHidden() {
    return settingsStore.superChatHidden
  }
  set superChatHidden(value) {
    settingsStore.setSuperChatHidden({
      superChatHidden: value
    })
  }

  get superStickerHidden() {
    return settingsStore.superStickerHidden
  }
  set superStickerHidden(value) {
    settingsStore.setSuperStickerHidden({
      superStickerHidden: value
    })
  }

  get membershipHidden() {
    return settingsStore.membershipHidden
  }
  set membershipHidden(value) {
    settingsStore.setMembershipHidden({
      membershipHidden: value
    })
  }

  get opacity() {
    return settingsStore.opacity
  }
  set opacity(value) {
    settingsStore.setOpacity({ opacity: value })
  }

  get speed() {
    return settingsStore.speed
  }
  set speed(value) {
    settingsStore.setSpeed({ speed: value })
  }

  get displays() {
    return settingsStore.displays
  }
  set displays(value) {
    settingsStore.setDisplays({ displays: value })
  }

  get rows() {
    return settingsStore.rows
  }
  set rows(value) {
    settingsStore.setRows({ rows: value })
  }

  get stackDirection() {
    return settingsStore.stackDirection
  }
  set stackDirection(value) {
    settingsStore.setStackDirection({ stackDirection: value })
  }

  get overflow() {
    return settingsStore.overflow
  }
  set overflow(value) {
    settingsStore.setOverflow({ overflow: value })
  }

  get extendedStyle() {
    return settingsStore.extendedStyle
  }
  set extendedStyle(value) {
    settingsStore.setExtendedStyle({
      extendedStyle: value
    })
  }

  onResetClick() {
    settingsStore.resetState()
  }
}
</script>

<style lang="scss" scoped>
.color ::v-deep {
  .v-input__slot:before,
  .v-input__slot:after {
    border: none !important;
  }
  input {
    cursor: pointer;
    height: 32px;
    padding: 0;
  }
}
</style>
