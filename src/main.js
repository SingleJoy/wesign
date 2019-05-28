
import Vue from 'vue'
import {router} from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import VueResource from 'vue-resource'
import vuex from 'vuex'
import store from './store'
import Es6Promise from 'es6-promise'
import Loading from 'wc-loading'
import 'wc-loading/style.css'
import moment  from 'moment'
import BASE_URL from '../config/global'
import { Message } from 'element-ui';
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

Es6Promise.polyfill()
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(vuex)
Vue.use(Loading)

Vue.config.productionTip = false;
Vue.prototype.baseURL = BASE_URL;
Vue.prototype.$message = Message;



new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  created(){
   
  },
  template: '<App/>'
})
