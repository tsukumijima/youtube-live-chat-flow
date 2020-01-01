import Vue from 'vue'
import vuetify from '~/plugins/vuetify'
import Options from '~/pages/Options.vue'
import store from '~/store'

new Vue({
  el: '#app',
  store,
  components: { Options },
  template: '<Options />',
  vuetify
})
