<template>
  <v-card class="pa-5" flat>
    <v-switch
      v-model="bottomChatInputEnabled"
      label="Bottom Chat Input"
      hint="Move the chat input to the bottom controls on video (Page reload required)"
      persistent-hint
    />
    <v-switch
      v-model="growBottomChatInputEnabled"
      :disabled="!bottomChatInputEnabled"
      label="Grow Bottom Chat Input"
      hint="Grow the bottom chat input on focus (Page reload required)"
      persistent-hint
    />
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { settingsStore } from '~/store'

@Component
export default class OthersTabItem extends Vue {
  get bottomChatInputEnabled() {
    return settingsStore.bottomChatInputEnabled
  }
  set bottomChatInputEnabled(value) {
    settingsStore.setBottomChatInputEnabled({
      bottomChatInputEnabled: value
    })
  }
  get growBottomChatInputEnabled() {
    return settingsStore.growBottomChatInputEnabled
  }
  set growBottomChatInputEnabled(value) {
    settingsStore.setGrowBottomChatInputEnabled({
      growBottomChatInputEnabled: value
    })
  }
}
</script>
