import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './components/App'
import store from './store'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App />'
})
