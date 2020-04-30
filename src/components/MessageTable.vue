<template>
  <div>
    <div
      v-for="authorType in authorTypes"
      :key="authorType"
      class="d-flex align-center px-4"
    >
      <div class="caption text-capitalize" style="width: 100px;">
        {{ authorType }}
      </div>
      <v-btn
        slot="activator"
        :color="isVisible(authorType) ? 'primary' : 'grey darken-1'"
        text
        icon
        @click="toggleVisible(authorType)"
      >
        <v-icon>mdi-eye</v-icon>
      </v-btn>
      <v-btn
        slot="activator"
        :color="getAvatar(authorType) ? 'primary' : 'grey darken-1'"
        text
        icon
        @click="toggleAvatar(authorType)"
      >
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <div
        class="color-picker mx-2"
        :style="{ backgroundColor: getColor(authorType) }"
      >
        <v-text-field
          :value="getColor(authorType)"
          class="mt-0 pt-0"
          type="color"
          hide-details
          @input="(value) => setColor(authorType, value)"
        />
      </div>
      <v-select
        :value="getTemplate(authorType)"
        :items="templates"
        dense
        hide-details
        class="mt-0 pt-0 ml-2 caption flex-grow-1"
        @input="(value) => setTemplate(authorType, value)"
      />
    </div>
    <div
      v-for="messageType in messageTypes"
      :key="messageType"
      class="d-flex align-center px-4"
    >
      <div class="caption text-capitalize" style="width: 100px;">
        {{ title(messageType) }}
      </div>
      <v-btn
        slot="activator"
        :color="isVisible(messageType) ? 'primary' : 'grey darken-1'"
        text
        icon
        @click="toggleVisible(messageType)"
      >
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { AuthorType, MessageType, Template } from '~/models/settings'
import { settingsStore } from '~/store'

@Component
export default class MessageStyleTable extends Vue {
  authorTypes = ['guest', 'member', 'moderator', 'owner', 'you']
  messageTypes = ['super-chat', 'super-sticker', 'membership']
  templates = [
    { text: '1 line (without Author)', value: 'one-line-without-author' },
    { text: '1 line (with Author)', value: 'one-line-with-author' },
    { text: '2 lines', value: 'two-line' },
  ]

  title(messageType: MessageType) {
    return messageType.replace('-', ' ')
  }
  isVisible(authorType: AuthorType | MessageType) {
    return settingsStore.visibilities.includes(authorType)
  }
  toggleVisible(authorType: AuthorType | MessageType) {
    let visibilities = settingsStore.visibilities
    const visible = visibilities.includes(authorType)
    if (visible) {
      visibilities = visibilities.filter((v) => v !== authorType)
    } else {
      visibilities = [...visibilities, authorType]
    }
    return settingsStore.setVisibilities({ visibilities })
  }
  getAvatar(authorType: AuthorType) {
    return settingsStore.styles[authorType].avatar
  }
  toggleAvatar(authorType: AuthorType) {
    const style = settingsStore.styles[authorType]
    return settingsStore.updateStyle({ authorType, avatar: !style.avatar })
  }
  getColor(authorType: AuthorType) {
    return settingsStore.styles[authorType].color
  }
  setColor(authorType: AuthorType, color: string) {
    return settingsStore.updateStyle({ authorType, color })
  }
  getTemplate(authorType: AuthorType) {
    return settingsStore.styles[authorType].template
  }
  setTemplate(authorType: AuthorType, template: Template) {
    return settingsStore.updateStyle({ authorType, template })
  }
}
</script>

<style lang="scss" scoped>
.color-picker {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid grey;
  position: relative;
  > .v-text-field {
    position: absolute;
    margin: 0 !important;
    width: 100%;
    height: 100%;
    opacity: 0;
    ::v-deep {
      input {
        cursor: pointer;
        height: 24px;
      }
    }
  }
}
</style>
