import Vue from 'vue'
import '~/plugins/vue-composition-api'
import vuetify from '~/plugins/vuetify'
import Options from '~/pages/options.vue'

new Vue({
  el: '#app',
  components: { Options },
  template: '<Options />',
  vuetify,
})
