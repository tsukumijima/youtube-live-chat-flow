<template>
  <tr>
    <td class="text-capitalize" v-text="item.subject" />
    <td class="keyword text-truncate" v-text="item.keyword" />
    <td v-text="regExp" />
    <td>
      <v-icon class="mr-2" color="teal" @click="onEditClick">edit</v-icon>
      <v-icon color="pink" @click="onDeleteClick">delete</v-icon>
    </td>
    <filter-dialog v-model="dialog" :inputs.sync="form" title="Edit Rule" />
  </tr>
</template>

<script>
import { mapMutations } from 'vuex'
import FilterDialog from './FilterDialog'

export default {
  components: {
    FilterDialog
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      form: {}
    }
  },
  computed: {
    regExp() {
      return this.item.regExp ? 'Used' : 'Not used'
    }
  },
  watch: {
    dialog(value) {
      if (!value && this.form) {
        this.setFilter({
          id: this.item.id,
          filter: this.form
        })
      }
    }
  },
  methods: {
    onEditClick() {
      this.form = this.item
      this.dialog = true
    },
    onDeleteClick() {
      this.removeFilter({ id: this.item.id })
    },
    ...mapMutations(['setFilter', 'removeFilter'])
  }
}
</script>

<style scoped>
.keyword {
  max-width: 256px;
}
</style>
