<template>
  <v-app>
    <v-content>
      <v-container class="pa-0" fluid>
        <v-card flat>
          <v-tabs v-model="tabIndex" grow>
            <v-tab v-for="(tab, index) in tabs" :key="index">
              {{ tab.title }}
            </v-tab>
            <v-tab-item v-for="(tab, index) in tabs" :key="index">
              <component :is="tab.item" />
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import FilterTabItem from '~/components/FilterTabItem.vue'
import MessageTabItem from '~/components/MessageTabItem.vue'
import OthersTabItem from '~/components/OthersTabItem.vue'

@Component
export default class Options extends Vue {
  tabIndex = 0
  tabs = [
    { title: 'Message', item: MessageTabItem },
    { title: 'Banned Words', item: FilterTabItem },
    { title: 'Others', item: OthersTabItem }
  ]
}
</script>

<style lang="scss" scoped>
.v-application {
  min-width: 640px;
}
</style>
