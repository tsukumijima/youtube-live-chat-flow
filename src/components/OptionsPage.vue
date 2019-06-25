<template>
  <v-app>
    <v-content>
      <v-container class="pa-0" fluid>
        <v-card flat>
          <v-tabs v-model="tabIndex">
            <v-tab v-for="(tab, index) in tabs" :key="index">
              {{ tab.title }}
            </v-tab>
            <v-tab-item v-for="(tab, index) in tabs" :key="index" lazy>
              <component :is="tab.item" />
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import FilterTabItem from './FilterTabItem'
import MessageTabItem from './MessageTabItem'
import OthersTabItem from './OthersTabItem'

export default {
  data() {
    return {
      tabIndex: null,
      tabs: [
        { title: 'Message', item: MessageTabItem },
        { title: 'Filter', item: FilterTabItem },
        { title: 'Others', item: OthersTabItem }
      ]
    }
  }
}
</script>

<style>
@import '~vuetify/dist/vuetify.min.css';
</style>

<style scoped>
.application {
  min-width: 640px;
}
</style>
