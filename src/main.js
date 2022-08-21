import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant
import Vant from 'vant'
// 加载vant样式
import 'vant/lib/index.css'
// 全局样式
import './styles/index.less'
// 动态设置rem基准值
import 'amfe-flexible'
// 注册vant
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
