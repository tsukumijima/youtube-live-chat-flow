<template>
  <v-card flat>
    <v-subheader>General</v-subheader>
    <message-table />

    <v-subheader class="mt-5">Appearance</v-subheader>
    <div class="px-4">
      <div class="d-flex">
        <div class="mr-3">
          <div class="caption">Height</div>
          <v-select
            v-model="heightType"
            :items="heightTypes"
            dense
            single-line
            class="pt-0 mt-1"
            style="width: 120px;"
          />
        </div>
        <div class="flex-grow-1">
          <template v-if="heightType === 'fixed'">
            <div class="caption">Line Height</div>
            <v-slider
              v-model="lineHeight"
              class="align-center mb-5"
              min="1"
              max="256"
              step="1"
              dense
              hide-details
            >
              <template v-slot:prepend>
                <v-text-field
                  v-model="lineHeight"
                  class="mt-0 pt-0"
                  dense
                  hide-details
                  single-line
                  type="number"
                  min="1"
                  max="256"
                  step="1"
                  suffix="px"
                  style="width: 75px;"
                />
              </template>
            </v-slider>
          </template>
          <template v-else>
            <div class="caption">Lines</div>
            <v-slider
              v-model="lines"
              class="align-center mb-5"
              min="1"
              max="64"
              step="1"
              dense
              hide-details
            >
              <template v-slot:prepend>
                <v-text-field
                  v-model="lines"
                  class="mt-0 pt-0"
                  dense
                  hide-details
                  single-line
                  type="number"
                  min="1"
                  max="64"
                  step="1"
                  style="width: 75px;"
                />
              </template>
            </v-slider>
          </template>
        </div>
      </div>

      <div class="caption">Opacity</div>
      <v-slider
        v-model="opacity"
        class="align-center mb-5"
        min="0"
        max="1"
        step="0.1"
        dense
        hide-details
      >
        <template v-slot:prepend>
          <v-text-field
            v-model="opacity"
            class="mt-0 pt-0"
            dense
            hide-details
            single-line
            type="number"
            min="0"
            max="1"
            step="0.1"
            style="width: 75px;"
          />
        </template>
      </v-slider>

      <div class="caption">Outline Ratio</div>
      <v-slider
        v-model="outlineRatio"
        class="align-center mb-5"
        min="0"
        max="5"
        step="0.1"
        dense
        hide-details
      >
        <template v-slot:prepend>
          <v-text-field
            v-model="outlineRatio"
            class="mt-0 pt-0"
            dense
            hide-details
            single-line
            type="number"
            min="0"
            max="5"
            step="0.1"
            suffix="%"
            style="width: 75px;"
          />
        </template>
      </v-slider>

      <div class="caption">Extended Style</div>
      <v-textarea
        v-model="extendedStyle"
        placeholder='font-family: "Yu Gothic", YuGothic, Meiryo;'
        dense
        single-line
        rows="1"
        auto-grow
        class="mt-1 pt-0"
      />
    </div>

    <v-subheader class="mt-5">Behavior</v-subheader>
    <div class="px-4">
      <div class="caption">Display Time</div>
      <v-slider
        v-model="displayTime"
        class="align-center mb-5"
        min="1"
        max="10"
        step="0.1"
        dense
        hide-details
      >
        <template v-slot:prepend>
          <v-text-field
            v-model="displayTime"
            class="mt-0 pt-0"
            dense
            hide-details
            single-line
            type="number"
            min="1"
            max="10"
            step="0.1"
            suffix="sec"
            style="width: 75px;"
          />
        </template>
      </v-slider>

      <div class="caption">Delay Time</div>
      <v-slider
        v-model="delayTime"
        class="align-center mb-5"
        min="0"
        max="300"
        step="1"
        dense
        hide-details
      >
        <template v-slot:prepend>
          <v-text-field
            v-model="delayTime"
            class="mt-0 pt-0"
            dense
            hide-details
            single-line
            type="number"
            min="0"
            max="300"
            step="1"
            suffix="sec"
            style="width: 75px;"
          />
        </template>
      </v-slider>

      <div class="caption">
        Max Displays (Infinite if set to 0)
      </div>
      <v-slider
        v-model="displays"
        class="align-center mb-5"
        min="0"
        max="100"
        dense
        hide-details
      >
        <template v-slot:prepend>
          <v-text-field
            v-model="displays"
            class="mt-0 pt-0"
            dense
            hide-details
            single-line
            type="number"
            min="0"
            max="100"
            style="width: 75px;"
          />
        </template>
      </v-slider>

      <div class="caption">Stack Directions</div>
      <v-select
        v-model="stackDirection"
        :items="stackDirections"
        dense
        single-line
        class="mt-1 pt-0"
      />

      <div class="caption">Overflow Mode</div>
      <v-select
        v-model="overflow"
        :items="overflows"
        dense
        single-line
        class="mt-1 pt-0"
      />

      <v-btn class="my-4" depressed block @click="onResetClick">
        Reset Settings to Default
      </v-btn>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import MessageTable from '~/components/MessageTable.vue'
import { settingsStore } from '~/store'

@Component({
  components: {
    MessageTable,
  },
})
export default class MessageTabItem extends Vue {
  heightTypes = [
    { text: 'Flexible', value: 'flexible' },
    { text: 'Fixed', value: 'fixed' },
  ]
  stackDirections = [
    { text: 'Top to Bottom', value: 'top_to_bottom' },
    { text: 'Bottom to Top', value: 'bottom_to_top' },
  ]
  overflows = [
    { text: 'Hidden', value: 'hidden' },
    { text: 'Overlay', value: 'overlay' },
  ]

  get heightType() {
    return settingsStore.heightType
  }
  set heightType(value) {
    settingsStore.setHeightType({ heightType: value })
  }

  get lines() {
    return settingsStore.lines
  }
  set lines(value) {
    settingsStore.setLines({ lines: Number(value) })
  }

  get lineHeight() {
    return settingsStore.lineHeight
  }
  set lineHeight(value) {
    settingsStore.setLineHeight({ lineHeight: Number(value) })
  }

  get opacity() {
    return settingsStore.opacity
  }
  set opacity(value) {
    settingsStore.setOpacity({ opacity: Number(value) })
  }

  get outlineRatio() {
    return (settingsStore.outlineRatio * 1000) / 10
  }
  set outlineRatio(value) {
    settingsStore.setOutlineRatio({ outlineRatio: (Number(value) * 10) / 1000 })
  }

  get extendedStyle() {
    return settingsStore.extendedStyle
  }
  set extendedStyle(value) {
    settingsStore.setExtendedStyle({
      extendedStyle: value,
    })
  }

  get displayTime() {
    return settingsStore.displayTime
  }
  set displayTime(value) {
    settingsStore.setDisplayTime({ displayTime: Number(value) })
  }

  get delayTime() {
    return settingsStore.delayTime
  }
  set delayTime(value) {
    settingsStore.setDelayTime({ delayTime: Number(value) })
  }

  get displays() {
    return settingsStore.displays
  }
  set displays(value) {
    settingsStore.setDisplays({ displays: Number(value) })
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

  onResetClick() {
    settingsStore.resetState()
  }
}
</script>
