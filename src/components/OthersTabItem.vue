<template>
  <v-card class="pa-5" flat>
    <v-switch
      v-model="bottomChatFormEnabled"
      label="Bottom Chat Form"
      hint="Move chat form to the bottom controls on video (Page reload required)"
      persistent-hint
    />
    <v-switch
      v-model="growChatFormEnabled"
      :disabled="!bottomChatFormEnabled"
      label="Grow Chat Form"
      hint="Grow chat form on the bottom controls on focus (Page reload required)"
      persistent-hint
    />
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { settingsStore } from '~/store'

@Component
export default class OthersTabItem extends Vue {
  get bottomChatFormEnabled() {
    return settingsStore.bottomChatFormEnabled
  }
  set bottomChatFormEnabled(value) {
    settingsStore.setBottomChatFormEnabled({
      bottomChatFormEnabled: value
    })
  }
  get growChatFormEnabled() {
    return settingsStore.growChatFormEnabled
  }
  set growChatFormEnabled(value) {
    settingsStore.setGrowChatFormEnabled({
      growChatFormEnabled: value
    })
  }
}
</script>
