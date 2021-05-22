<template>
  <div class="appearance-section">
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

    <div class="caption">Emoji Style</div>
    <v-select
      v-model="emojiStyle"
      :items="emojiStyles"
      dense
      single-line
      class="mt-1 pt-0"
    />

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
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { settingsStore } from '~/store'

const heightTypes = [
  { text: 'Flexible', value: 'flexible' },
  { text: 'Fixed', value: 'fixed' },
]

const emojiStyles = [
  { text: 'Image', value: 'image' },
  { text: 'Alternative Text', value: 'text' },
  { text: 'None', value: 'none' },
]

export default defineComponent({
  setup() {
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
    const emojiStyle = computed({
      get: () => {
        return settingsStore.emojiStyle
      },
      set: (value) => {
        settingsStore.setEmojiStyle({
          emojiStyle: value,
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

    return {
      background,
      backgroundOpacity,
      emojiStyle,
      emojiStyles,
      extendedStyle,
      heightType,
      heightTypes,
      lineHeight,
      lines,
      maxWidth,
      opacity,
      outlineRatio,
    }
  },
})
</script>
