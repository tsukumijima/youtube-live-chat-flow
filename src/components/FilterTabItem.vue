<template>
  <v-card class="pa-3" flat>
    <v-subheader class="pl-0">Banned Words</v-subheader>
    <v-layout>
      <v-spacer />
      <v-btn color="primary" depressed @click="onAddClick">
        Add Rule
      </v-btn>
    </v-layout>
    <filter-table />
    <filter-dialog v-model="dialog" :inputs.sync="form" />
  </v-card>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import FilterDialog from './FilterDialog'
import FilterTable from './FilterTable'

export default {
  components: {
    FilterDialog,
    FilterTable
  },
  data() {
    return {
      dialog: false,
      form: {
        subject: 'message',
        keyword: '',
        regExp: false
      }
    }
  },
  computed: {
    ...mapState(['filters'])
  },
  watch: {
    dialog(value) {
      if (!value && this.form) {
        this.addFilter({ filter: this.form })
      }
    },
    filters(value, oldValue) {
      if (value.length > oldValue.length) {
        this.$nextTick(() => {
          window.scrollTo(0, document.body.scrollHeight)
        })
      }
    }
  },
  methods: {
    onAddClick() {
      this.dialog = true
    },
    ...mapMutations(['addFilter'])
  }
}
</script>
