import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false
Vue.use(Element, { size: 'small', zIndex: 3000 })
Vue.use(mavonEditor)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
