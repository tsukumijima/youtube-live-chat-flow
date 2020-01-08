<template>
  <v-card class="pa-5" flat>
    <v-switch
      v-model="bottomChatFormEnabled"
      label="Bottom Chat Form"
      hint="Move chat form to bottom controls on video (Page reload required)"
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
}
</script>
