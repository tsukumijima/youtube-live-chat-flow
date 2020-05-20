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
export default class App extends Vue {
  tabIndex = 0
  tabs = [
    { title: 'Message', item: MessageTabItem },
    { title: 'Filter', item: FilterTabItem },
    { title: 'Input', item: InputTabItem },
  ]
}
</script>

<style lang="scss" scoped>
.v-application {
  width: 640px;
  .v-tabs {
    ::v-deep {
      > .v-tabs-bar {
        position: fixed;
        width: 100%;
        z-index: 1;
      }
      > .v-tabs-items {
        margin-top: 48px;
      }
    }
  }
}
</style>
