<template>
  <v-app>
    <v-content class="fill-height">
      <v-container class="pa-0" fluid fill-height>
        <v-tabs v-model="tabIndex" grow class="fill-height">
          <v-tab v-for="(tab, index) in tabs" :key="index">
            {{ tab.title }}
          </v-tab>
          <v-tab-item v-for="(tab, index) in tabs" :key="index">
            <component :is="tab.item" />
          </v-tab-item>
        </v-tabs>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import FilterTabItem from '~/components/FilterTabItem.vue'
import MessageTabItem from '~/components/MessageTabItem.vue'
import InputTabItem from '~/components/InputTabItem.vue'

@Component
export default class Options extends Vue {
  tabIndex = 0
  tabs = [
    { title: 'Message', item: MessageTabItem },
    { title: 'Filter', item: FilterTabItem },
    { title: 'Input', item: InputTabItem },
  ]
}
</script>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
html {
  overflow-y: hidden;
}
</style>

<style lang="scss" scoped>
.v-application {
  min-width: 640px;
  height: 572px;
  .v-tabs {
    display: flex;
    flex-direction: column;
    ::v-deep {
      > .v-tabs-bar {
        flex-grow: 0;
      }
      > .v-tabs-items {
        flex-grow: 1;
        flex-basis: 0;
        overflow-y: hidden;
        > .v-window__container {
          height: 100%;
          > .v-window-item {
            height: 100%;
            overflow-y: auto;
          }
        }
      }
    }
  }
}
</style>
