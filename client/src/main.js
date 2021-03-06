/*
 * @Description:
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import * as d3 from "d3";
import store from "./store/store";
import Echart from "echarts";
import {Message} from 'element-ui';
Vue.use(ElementUI);

Vue.prototype.$axios = axios;
Vue.prototype.$d3 = d3;
Vue.prototype.$echarts = Echart;
window.d3 = d3; //暂时设置为全局变量
Vue.prototype.$message = Message;

Vue.config.productionTip = false;

Vue.pro;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  store,
  template: "<App/>"
});
