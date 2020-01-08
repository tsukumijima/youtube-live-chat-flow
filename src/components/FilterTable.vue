<template>
  <v-data-table
    :headers="headers"
    :items="filters"
    :mobile-breakpoint="0"
    :items-per-page="-1"
    hide-default-footer
  >
    <filter-table-row
      slot="item"
      :key="props.item.id"
      slot-scope="props"
      :item="props.item"
    />
  </v-data-table>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { settingsStore } from '~/store'
import FilterTableRow from '~/components/FilterTableRow.vue'

@Component({
  components: {
    FilterTableRow
  }
})
export default class FilterTable extends Vue {
  headers = [
    { text: 'Subject', value: 'subject' },
    { text: 'Keyword', value: 'keyword' },
    { text: 'Regular Expression', value: 'regExp' },
    { text: 'Actions', sortable: false }
  ]

  get filters() {
    return settingsStore.filters
  }
}
</script>
