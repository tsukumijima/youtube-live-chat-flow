<template>
  <v-card class="" flat>
    <v-subheader>Style</v-subheader>
    <message-style-table />
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
        v-model="lines"
        :placeholder="placeholder.lines"
        label="Lines"
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
import MessageStyleTable from '~/components/MessageStyleTable.vue'
import { settingsStore } from '~/store'

@Component({
  components: {
    MessageStyleTable,
  },
})
export default class MessageTabItem extends Vue {
  placeholder = {
    opacity: '0.8',
    speed: '5',
    displays: '0',
    lines: '12',
    extendedStyle: 'font-family: "Yu Gothic", YuGothic, Meiryo;',
  }
  stackDirections = [
    { text: 'Top to Bottom', value: 'top_to_bottom' },
    { text: 'Bottom to Top', value: 'bottom_to_top' },
  ]
  overflows = [
    { text: 'Hidden', value: 'hidden' },
    { text: 'Overlay', value: 'overlay' },
  ]

  get superChatHidden() {
    return settingsStore.superChatHidden
  }
  set superChatHidden(value) {
    settingsStore.setSuperChatHidden({
      superChatHidden: value,
    })
  }

  get superStickerHidden() {
    return settingsStore.superStickerHidden
  }
  set superStickerHidden(value) {
    settingsStore.setSuperStickerHidden({
      superStickerHidden: value,
    })
  }

  get membershipHidden() {
    return settingsStore.membershipHidden
  }
  set membershipHidden(value) {
    settingsStore.setMembershipHidden({
      membershipHidden: value,
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

  get lines() {
    return settingsStore.lines
  }
  set lines(value) {
    settingsStore.setLines({ lines: value })
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
      extendedStyle: value,
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
