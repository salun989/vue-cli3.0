import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import element from 'element-ui'
import ajax from './utils/http'
Vue.prototype.$http = ajax
Vue.config.productionTip = false
Vue.use(element)
import 'utils/index.css'
new Vue({
  render: h => h(App),
}).$mount('#app')
