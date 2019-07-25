import Vue from 'vue'
import vuetify from './plugins/vuetify'
import OptionsPage from './components/OptionsPage'
import createStore from './store'

createStore().then((store) => {
  new Vue({
    el: '#app',
    store,
    components: { OptionsPage },
    template: '<OptionsPage />',
    vuetify
  })
})
