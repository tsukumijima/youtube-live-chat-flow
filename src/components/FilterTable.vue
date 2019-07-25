<template>
  <v-data-table
    :headers="headers"
    :items="filters"
    hide-default-footer
    :mobile-breakpoint="0"
  >
    <filter-table-row
      slot="item"
      :key="props.item.id"
      slot-scope="props"
      :item="props.item"
    />
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'
import FilterTableRow from './FilterTableRow'

export default {
  components: {
    FilterTableRow
  },
  data() {
    return {
      headers: [
        { text: 'Subject', value: 'subject' },
        { text: 'Keyword', value: 'keyword' },
        { text: 'Regular Expression', value: 'regExp' },
        { text: 'Actions', sortable: false }
      ]
    }
  },
  computed: {
    ...mapState(['filters'])
  }
}
</script>
