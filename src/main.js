
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
// import createPersistedState from 'vuex-persistedstate'   //vuex数据持久化
import 'element-ui/lib/theme-chalk/index.css'
import '../static/styles/animate.css'
import App from './App'
import VueResource from 'vue-resource'
import vuex from 'vuex'
import store from './store'
import Es6Promise from 'es6-promise'
import Loading from 'wc-loading'
import 'wc-loading/style.css'
import axios from 'axios'
import moment  from 'moment'

import BASE_URL from '../config/global'


Es6Promise.polyfill()
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(vuex)
Vue.use(Loading)

Vue.config.productionTip = false
Vue.prototype.baseURL = BASE_URL;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// router.beforeEach((to, from, next) => {
//   axios.get('../static/version.json?_=' + Math.random()).then(response => {
//       if (200 == response.status) {
//           if (process.env.VERSION !== response.data.version) {

//               var message = "系统版本有更新，点击确认加载最新，或按【CTRL + F5】！"
//               Vue.prototype.$alert(message, '系统提示', {
//                 confirmButtonText: '确定',
//                 callback: function(){
//                   window.location.reload(true);
//                 }
//               });

//               return;
//           }
//           next();
//       }
//   }).catch(err => {
//       console.error(err);
//       next();
//   });
// });