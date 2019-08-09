import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'

// 设置rem基准
import 'amfe-flexible'

import '@/styles/index.less'
import VeeValidate, { Validator } from 'vee-validate'
// 导入中文文件
import zhCN from 'vee-validate/dist/locale/ja'
Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(VeeValidate)
// 配置语言
Validator.localize('zh_cn', zhCN)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
