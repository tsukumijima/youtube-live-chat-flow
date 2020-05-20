import Vue from 'vue'
import vuetify from '~/plugins/vuetify'
import Popup from '~/pages/popup.vue'

new Vue({
  el: '#app',
  components: { Popup },
  template: '<Popup />',
  vuetify,
})
