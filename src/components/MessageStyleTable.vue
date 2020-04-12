<template>
  <v-simple-table dense>
    <template v-slot:default>
      <tbody>
        <tr v-for="authorType in authorTypes" :key="authorType">
          <td class="text-capitalize">{{ authorType }}</td>
          <td class="px-0">
            <v-btn
              slot="activator"
              :color="getAvatar(authorType) ? 'primary' : 'grey darken-1'"
              text
              icon
              @click="toggleAvatar(authorType)"
            >
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </td>
          <td class="px-0">
            <v-text-field
              :value="getColor(authorType)"
              class="color mt-0 pt-0"
              type="color"
              hide-details
              @input="(value) => setColor(authorType, value)"
            />
          </td>
          <td>
            <v-select
              :value="getTemplate(authorType)"
              :items="templates"
              dense
              hide-details
              class="mt-0 pt-0 body-2"
              @input="(value) => setTemplate(authorType, value)"
            />
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { AuthorType, Template } from '~/models/settings'
import { settingsStore } from '~/store'

@Component
export default class MessageStyleTable extends Vue {
  authorTypes = ['guest', 'member', 'moderator', 'owner', 'you']
  templates = [
    { text: '1 line (without author)', value: 'one-line-without-author' },
    { text: '1 line (with author)', value: 'one-line-with-author' },
    { text: '2 lines (with author)', value: 'two-line' },
  ]

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
td:first-child {
  width: 120px;
}
.color {
  width: 30px;
  ::v-deep {
    .v-input__slot:before,
    .v-input__slot:after {
      border: none !important;
    }
    input {
      cursor: pointer;
      height: 32px;
      padding: 0;
    }
  }
}
</style>
