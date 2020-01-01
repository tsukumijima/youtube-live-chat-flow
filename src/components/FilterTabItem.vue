<template>
  <v-card class="py-5" flat>
    <div class="text-right mb-3 px-5">
      <v-btn color="primary" depressed @click="onAddClick">
        Add Rule
      </v-btn>
    </div>
    <filter-table />
    <filter-dialog v-model="dialog" :inputs.sync="form" />
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { settingsStore } from '~/store'
import Filter from '~/models/filter'
import FilterDialog from '~/components/FilterDialog.vue'
import FilterTable from '~/components/FilterTable.vue'

@Component({
  components: {
    FilterDialog,
    FilterTable
  }
})
export default class FilterTabItem extends Vue {
  dialog = false
  form = {
    subject: 'message',
    keyword: '',
    regExp: false
  }

  get filters() {
    return settingsStore.filters
  }

  @Watch('dialog')
  onDialogChanged(value: boolean) {
    if (!value && this.form) {
      settingsStore.addFilter({ ...this.form })
    }
  }
  @Watch('filters')
  onFiltersChanged(value: Filter[], oldValue: Filter[]) {
    if (value.length > oldValue.length) {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight)
      })
    }
  }

  onAddClick() {
    this.dialog = true
  }
}
</script>
