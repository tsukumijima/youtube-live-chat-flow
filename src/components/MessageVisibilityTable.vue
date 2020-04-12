<template>
  <v-simple-table dense>
    <template v-slot:default>
      <tbody>
        <tr v-for="messageType in messageTypes" :key="messageType">
          <td class="text-capitalize">{{ messageType }}</td>
          <td class="px-0">
            <v-btn
              slot="activator"
              :color="isVisible(messageType) ? 'primary' : 'grey darken-1'"
              text
              icon
              @click="toggleVisible(messageType)"
            >
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { MessageType } from '~/models/settings'
import { settingsStore } from '~/store'

@Component
export default class MessageVisibilityTable extends Vue {
  messageTypes = ['super-chat', 'super-sticker', 'membership']

  isVisible(messageType: MessageType) {
    return settingsStore.visibilities.includes(messageType)
  }
  toggleVisible(messageType: MessageType) {
    let visibilities = settingsStore.visibilities
    const visible = visibilities.includes(messageType)
    if (visible) {
      visibilities = visibilities.filter((v) => v !== messageType)
    } else {
      visibilities = [...visibilities, messageType]
    }
    return settingsStore.setVisibilities({ visibilities })
  }
}
</script>

<style lang="scss" scoped>
td:first-child {
  width: 120px;
}
</style>
