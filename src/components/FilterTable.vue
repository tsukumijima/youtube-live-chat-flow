<template>
  <v-data-table :headers="headers" :items="filters" hide-actions>
    <filter-table-header-row
      slot="headers"
      slot-scope="props"
      :headers="props.headers"
    />
    <filter-table-row
      slot="items"
      :key="props.item.id"
      slot-scope="props"
      :item="props.item"
    />
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'
import FilterTableHeaderRow from './FilterTableHeaderRow'
import FilterTableRow from './FilterTableRow'

export default {
  components: {
    FilterTableHeaderRow,
    FilterTableRow
  },
  data() {
    return {
      headers: [
        { text: 'Subject' },
        { text: 'Keyword' },
        { text: 'Regular Expression' },
        { text: 'Actions' }
      ]
    }
  },
  computed: {
    ...mapState(['filters'])
  }
}
</script>
