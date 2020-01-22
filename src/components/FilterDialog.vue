<template>
  <v-dialog v-model="dialog" max-width="480">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card>
        <v-card-title primary-title>
          <span class="title" v-text="title" />
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" class="py-0">
              <v-select
                v-model="formInputs.subject"
                :items="subjects"
                label="Subject"
                dense
              />
            </v-col>
            <v-col cols="12" class="py-0">
              <v-text-field
                v-model="formInputs.keyword"
                :rules="keywordRules"
                label="Keyword"
                placeholder="Words or Pattern"
                required
              />
            </v-col>
            <v-col cols="12" class="py-0">
              <v-checkbox
                v-model="formInputs.regExp"
                label="Regular Expression"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click.native="onCloseClick">Cancel</v-btn>
          <v-btn color="primary" text @click.native="onSaveClick">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator'
import { VForm } from 'vuetify/lib'

@Component
export default class FilterDialog extends Vue {
  @Prop({ type: Boolean, required: true }) readonly value!: boolean
  @Prop({ type: Object, default: () => ({}) }) readonly inputs!: object
  @Prop({ type: String, default: 'Add Rule' }) readonly title!: string
  @Ref() readonly form!: typeof VForm

  subjects = [
    { text: 'Author', value: 'author' },
    { text: 'Message', value: 'message' }
  ]
  keywordRules = [(v: string) => !!v || 'Keyword is required']
  valid = false
  dialog = false
  formInputs = {}

  @Watch('value')
  onValueChanged(value: boolean) {
    this.dialog = value
    if (value) {
      this.formInputs = {
        subject: 'message',
        ...this.inputs
      }
    }
  }
  @Watch('dialog')
  onDialogChanged(value: boolean) {
    if (!value) {
      this.$emit('update:inputs', null)
    }
    this.$emit('input', value)
  }

  onCloseClick() {
    this.$emit('update:inputs', null)
    this.$emit('input', false)
  }
  onSaveClick() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(this.form as any).validate()) {
      return
    }
    this.$emit('update:inputs', { ...this.formInputs })
    this.$emit('input', false)
  }
}
</script>
