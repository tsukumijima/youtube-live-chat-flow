<template>
  <v-card class="pa-5" flat>
    <v-switch
      v-model="bottomChatInputEnabled"
      label="Bottom Chat Input"
      hint="Move the chat input to the bottom controls on video (Page reload required)"
      persistent-hint
      dense
    />
    <v-switch
      v-model="growBottomChatInputEnabled"
      :disabled="!bottomChatInputEnabled"
      label="Grow Bottom Chat Input"
      dense
    />
  </v-card>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { settingsStore } from '~/store'

export default defineComponent({
  setup() {
    const bottomChatInputEnabled = computed({
      get: () => {
        return settingsStore.bottomChatInputEnabled
      },
      set: (value) => {
        settingsStore.setBottomChatInputEnabled({
          bottomChatInputEnabled: value,
        })
      },
    })
    const growBottomChatInputEnabled = computed({
      get: () => {
        return settingsStore.growBottomChatInputEnabled
      },
      set: (value) => {
        settingsStore.setGrowBottomChatInputEnabled({
          growBottomChatInputEnabled: value,
        })
      },
    })

    return {
      bottomChatInputEnabled,
      growBottomChatInputEnabled,
    }
  },
})
</script>
