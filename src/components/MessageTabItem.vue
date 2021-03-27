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
            style="width: 120px"
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
              <template #prepend>
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
                  style="width: 75px"
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
              <template #prepend>
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
                  style="width: 75px"
                />
              </template>
            </v-slider>
          </template>
        </div>
      </div>

      <div class="caption">Max Lines</div>
      <v-slider
        v-model="maxLines"
        :max="lines"
        class="align-center mb-5"
        min="0"
        dense
        hide-details
      >
        <template #prepend>
          <v-text-field
            v-model="maxLines"
            :max="lines"
            class="mt-0 pt-0"
            dense
            hide-details
            single-line
            type="number"
            min="0"
            style="width: 75px"
          />
        </template>
      </v-slider>

      <div class="caption">Max Width (Infinite if set to 0)</div>
      <v-slider
        v-model="maxWidth"
        class="align-center mb-5"
        min="0"
        max="300"
        dense
        hide-details
      >
        <template #prepend>
          <v-text-field
            v-model="maxWidth"
            class="mt-0 pt-0"
            dense
            hide-details
            single-line
            type="number"
            min="0"
            max="300"
            suffix="%"
            style="width: 75px"
          />
        </template>
      </v-slider>

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
        <template #prepend>
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
            style="width: 75px"
          />
        </template>
      </v-slider>

      <div class="caption">Show Background (for Non-paid Messages)</div>
      <v-switch v-model="background" class="mt-0" dense />

      <div class="caption">Background Opacity</div>
      <v-slider
        v-model="backgroundOpacity"
        class="align-center mb-5"
        min="0"
        max="1"
        step="0.1"
        dense
        hide-details
      >
        <template #prepend>
          <v-text-field
            v-model="backgroundOpacity"
            class="mt-0 pt-0"
            dense
            hide-details
            single-line
            type="number"
            min="0"
            max="1"
            step="0.1"
            style="width: 75px"
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
        <template #prepend>
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
            style="width: 75px"
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
        <template #prepend>
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
            style="width: 75px"
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
        <template #prepend>
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
            style="width: 75px"
          />
        </template>
      </v-slider>

      <div class="caption">Max Displays (Infinite if set to 0)</div>
      <v-slider
        v-model="displays"
        class="align-center mb-5"
        min="0"
        max="100"
        dense
        hide-details
      >
        <template #prepend>
          <v-text-field
            v-model="displays"
            class="mt-0 pt-0"
            dense
            hide-details
            single-line
            type="number"
            min="0"
            max="100"
            style="width: 75px"
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
    </div>

    <v-subheader class="mt-5">Filter</v-subheader>
    <div class="px-4">
      Filter Messages by
      <a href="#" @click.prevent="handleClickLink">
        Chat Filter for YouTube Live
      </a>
    </div>

    <v-btn class="ma-4" depressed block @click="handleClickReset">
      Reset Settings to Default
    </v-btn>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import MessageTable from '~/components/MessageTable.vue'
import { settingsStore } from '~/store'

const heightTypes = [
  { text: 'Flexible', value: 'flexible' },
  { text: 'Fixed', value: 'fixed' },
]
const stackDirections = [
  { text: 'Top to Bottom', value: 'top_to_bottom' },
  { text: 'Bottom to Top', value: 'bottom_to_top' },
]
const overflows = [
  { text: 'Hidden', value: 'hidden' },
  { text: 'Overlay', value: 'overlay' },
]

export default defineComponent({
  components: {
    MessageTable,
  },
  setup() {
    const heightType = computed({
      get: () => {
        return settingsStore.heightType
      },
      set: (value) => {
        settingsStore.setHeightType({
          heightType: value,
        })
      },
    })
    const lines = computed({
      get: () => {
        return settingsStore.lines
      },
      set: (value) => {
        settingsStore.setLines({
          lines: Number(value),
        })
      },
    })
    const maxLines = computed({
      get: () => {
        return settingsStore.maxLines
      },
      set: (value) => {
        settingsStore.setMaxLines({
          maxLines: Number(value),
        })
      },
    })
    const maxWidth = computed({
      get: () => {
        return settingsStore.maxWidth
      },
      set: (value) => {
        settingsStore.setMaxWidth({
          maxWidth: Number(value),
        })
      },
    })
    const lineHeight = computed({
      get: () => {
        return settingsStore.lineHeight
      },
      set: (value) => {
        settingsStore.setLineHeight({
          lineHeight: Number(value),
        })
      },
    })
    const opacity = computed({
      get: () => {
        return settingsStore.opacity
      },
      set: (value) => {
        settingsStore.setOpacity({
          opacity: Number(value),
        })
      },
    })
    const background = computed({
      get: () => {
        return settingsStore.background
      },
      set: (value) => {
        settingsStore.setBackground({
          background: value,
        })
      },
    })
    const backgroundOpacity = computed({
      get: () => {
        return settingsStore.backgroundOpacity
      },
      set: (value) => {
        settingsStore.setBackgroundOpacity({
          backgroundOpacity: Number(value),
        })
      },
    })
    const outlineRatio = computed({
      get: () => {
        return (settingsStore.outlineRatio * 1000) / 10
      },
      set: (value) => {
        settingsStore.setOutlineRatio({
          outlineRatio: (Number(value) * 10) / 1000,
        })
      },
    })
    const extendedStyle = computed({
      get: () => {
        return settingsStore.extendedStyle
      },
      set: (value) => {
        settingsStore.setExtendedStyle({
          extendedStyle: value,
        })
      },
    })
    const displayTime = computed({
      get: () => {
        return settingsStore.displayTime
      },
      set: (value) => {
        settingsStore.setDisplayTime({
          displayTime: Number(value),
        })
      },
    })
    const delayTime = computed({
      get: () => {
        return settingsStore.delayTime
      },
      set: (value) => {
        settingsStore.setDelayTime({
          delayTime: Number(value),
        })
      },
    })
    const displays = computed({
      get: () => {
        return settingsStore.displays
      },
      set: (value) => {
        settingsStore.setDisplays({
          displays: Number(value),
        })
      },
    })
    const stackDirection = computed({
      get: () => {
        return settingsStore.stackDirection
      },
      set: (value) => {
        settingsStore.setStackDirection({
          stackDirection: value,
        })
      },
    })
    const overflow = computed({
      get: () => {
        return settingsStore.overflow
      },
      set: (value) => {
        settingsStore.setOverflow({
          overflow: value,
        })
      },
    })

    const handleClickLink = () => {
      window.open(
        'https://chrome.google.com/webstore/detail/chat-filter-for-youtube-l/jalcplhakmckbmlbidmbmpaegcpbejog'
      )
    }
    const handleClickReset = () => {
      settingsStore.resetState()
    }

    return {
      heightTypes,
      stackDirections,
      overflows,
      heightType,
      lines,
      maxLines,
      maxWidth,
      lineHeight,
      opacity,
      background,
      backgroundOpacity,
      outlineRatio,
      extendedStyle,
      displayTime,
      delayTime,
      displays,
      stackDirection,
      overflow,
      handleClickLink,
      handleClickReset,
    }
  },
})
</script>
