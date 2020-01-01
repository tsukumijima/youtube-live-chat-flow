<template>
  <tr>
    <td class="text-capitalize" v-text="item.subject" />
    <td class="keyword text-truncate" v-text="item.keyword" />
    <td v-text="regExp" />
    <td>
      <v-btn class="mr-1" icon @click="onEditClick">
        <v-icon color="teal">mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon @click="onDeleteClick">
        <v-icon color="pink">mdi-delete</v-icon>
      </v-btn>
    </td>
    <filter-dialog v-model="dialog" :inputs.sync="form" title="Edit Rule" />
  </tr>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { settingsStore } from '~/store'
import Filter from '~/models/filter'
import FilterDialog from '~/components/FilterDialog.vue'

@Component({
  components: {
    FilterDialog
  }
})
export default class FilterTableRow extends Vue {
  @Prop({ type: Object, required: true }) readonly item!: Filter

  dialog = false
  form = {}

  get regExp() {
    return this.item.regExp ? 'Used' : 'Not used'
  }

  @Watch('dialog')
  onDialogChanged(value: boolean) {
    if (!value && this.form) {
      settingsStore.setFilter({
        ...this.form,
        id: this.item.id
      })
    }
  }

  onEditClick() {
    this.form = this.item
    this.dialog = true
  }
  onDeleteClick() {
    settingsStore.removeFilter({ id: this.item.id })
  }
}
</script>

<style scoped>
.keyword {
  max-width: 256px;
}
</style>
