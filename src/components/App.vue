<template>
  <v-app>
    <v-main class="fill-height">
      <v-container class="pa-0" fluid fill-height>
        <v-tabs v-model="state.index" grow class="fill-height">
          <v-tab v-for="(tab, index) in tabs" :key="index">
            {{ tab.title }}
          </v-tab>
          <v-tab-item v-for="(tab, index) in tabs" :key="index">
            <component :is="tab.item" />
          </v-tab-item>
        </v-tabs>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import MessageTabItem from '~/components/MessageTabItem.vue'
import InputTabItem from '~/components/InputTabItem.vue'

const tabs = [
  { title: 'Message', item: MessageTabItem },
  { title: 'Input', item: InputTabItem },
]

export default defineComponent({
  setup() {
    const state = reactive({
      index: 0,
    })

    return {
      tabs,
      state,
    }
  },
})
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
