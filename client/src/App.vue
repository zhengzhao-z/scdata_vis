<!--
 * @Description: 
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
-->
<template>
  <div id="app">
    <tmap></tmap>
    <calendar></calendar>
    <mySwitch></mySwitch>
    <overView></overView>
    <detail></detail>
    <risk></risk>
    <sankey></sankey>
 
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import tmap from "./components/map";
import traffic from "./components/traffice";
import control from "./components/control";
import calendar from "./components/calendar";
import container from "./components/container";
import overView from "./components/overView";
import detail from "./components/detail";
import mySwitch from "./components/mySwitch";
import sankey from "./components/sankey"
import risk from "./components/risk"

export default {
  name: "App",
  data() {
    return {
      arrow: "<"
    };
  },
  components: {
    tmap,
    traffic,
    control,
    calendar,
    container,
    overView,
    detail,
    mySwitch,
    sankey,
    risk
  },
  mounted(){
    //请求相关的数据
    //1. 监测站基本数据--经纬度、名称、标识号
    this.$axios.get("http://localhost:3000/monitor").then(res=>{
      //写入vuex
      this.$store.commit("setMonitors",res.data);
    });
    //2. 日历数据
    this.$store.dispatch("changeCalendarAllData");
    //3.risk曲线 默认G5
    this.$axios.post("http://localhost:3000/risk",{
      "road":"G5"
    }).then(res=>{
      this.$store.commit("setRisk",res.data);
    })
    //4. traffic 像素矩阵默认
    this.$axios.post("http://localhost:3000/traffic",{
      id:"51000020160504B7B7DE9BC2D5680D2C",  //G5 黄许
      date:"2019-01-01 00:00:00"
    }).then(res=>{
      this.$store.commit("setTraffic",res.data);
    })
  },
  methods:{
  }
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
}
#app {
  position: relative;
}
.bg {
  box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.3) inset,
    0 0.5em 1em rgba(0, 0, 0, 0.1);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
.button {
  position: absolute;
  left: 470px;
  top: 600px;
  width: 30px;
  height: 30px;
  transition: all 500ms;
  outline: none;
  border: 1px solid #ccc;
  cursor: pointer;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  background: #f5f4ef;
  color: #589ef8;
  font-weight: 700;
}
.button:hover {
  background: yellowgreen;
  color: black;
  width: 32px;
  height: 32px;
}
.title{
  /* 图标题 */
  font-size: 16px;
  font-weight: 600;
  color: #409EFF;
  cursor:pointer;
}
</style>
