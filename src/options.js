import Vue from 'vue'
import Vuetify from 'vuetify'
import OptionsPage from './components/OptionsPage'
import createStore from './store'

Vue.use(Vuetify)

createStore().then((store) => {
  new Vue({
    el: '#app',
    store,
    components: { OptionsPage },
    template: '<OptionsPage />'
  })
})
