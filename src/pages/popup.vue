<template>
  <app />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import App from '~/components/App.vue'

@Component({
  components: { App },
})
export default class Popup extends Vue {}
</script>
