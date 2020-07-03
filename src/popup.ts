import Vue from 'vue'
import '~/plugins/vue-composition-api'
import vuetify from '~/plugins/vuetify'
import Popup from '~/pages/popup.vue'

new Vue({
  el: '#app',
  components: { Popup },
  template: '<Popup />',
  vuetify,
})
