/*
 * @Description: 
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
 */ 
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import * as d3 from "d3";


Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.prototype.$d3 = d3;
window.d3 = d3; //暂时设置为全局变量


Vue.config.productionTip = false

Vue.pro
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
