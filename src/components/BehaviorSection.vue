<template>
  <div class="behavior-section">
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

    <div class="caption">Max Lines</div>
    <v-slider
      v-model="maxLines"
      class="align-center mb-5"
      min="0"
      dense
      hide-details
    >
      <template #prepend>
        <v-text-field
          v-model="maxLines"
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

    <div class="caption">Max Displays per second (Infinite if set to 0)</div>
    <v-slider
      v-model="maxDisplays"
      class="align-center mb-5"
      min="0"
      max="10"
      dense
      hide-details
    >
      <template #prepend>
        <v-text-field
          v-model="maxDisplays"
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
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { settingsStore } from '~/store'

const stackDirections = [
  { text: 'Top to Bottom', value: 'top_to_bottom' },
  { text: 'Bottom to Top', value: 'bottom_to_top' },
]
const overflows = [
  { text: 'Hidden', value: 'hidden' },
  { text: 'Overlay', value: 'overlay' },
]

export default defineComponent({
  setup() {
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
    const maxDisplays = computed({
      get: () => {
        return settingsStore.maxDisplays
      },
      set: (value) => {
        settingsStore.setMaxDisplays({
          maxDisplays: Number(value),
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

    return {
      delayTime,
      displayTime,
      maxDisplays,
      maxLines,
      overflow,
      overflows,
      stackDirection,
      stackDirections,
    }
  },
})
</script>
