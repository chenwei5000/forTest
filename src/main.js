import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局的css样式
import './assets/utils/filters.js'
import './assets/fonts/iconfont.css'
import './assets/css/base.css'
import Axios from 'axios'

Vue.prototype.$http = Axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
