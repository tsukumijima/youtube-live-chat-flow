import Vue from 'vue'
import App from '~/components/App.vue'
import '~/plugins/vue-composition-api'
import vuetify from '~/plugins/vuetify'

new Vue({
  el: '#app',
  render: (createElement) => createElement(App),
  vuetify,
})
