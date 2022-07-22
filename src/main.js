import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import Vuex from 'vuex'
import VueSession from 'vue-session'
Vue.use(VueSession)


// 引入Echarts
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts

Vue.use(Vuex)
Vue.prototype.$axios = axios

//vue生产提示的关闭
Vue.config.productionTip = false
Vue.use(ElementUI);

const store = new Vuex.Store({
  state: {
    seen: 0,
    form: {
      username: "",
      phone: "",
      email: "",
      password: "",
      newPass: "",
      checkPass: "",
    },
    quesId: "",
  },
  mutations: {
    ChangeUserState(state, data) {
      state.seen = data;
    },
    CommitInfo(state, data) {
      state.form.username = data.username;
      state.form.phone = data.phone;
      state.form.email = data.email;
      state.form.password = data.password;
    },
    getQuesId(state, data) {
      state.quesId = data;
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
