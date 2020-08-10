<!--
 * @Description: 
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
-->
<!--
 * @Description: 
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
-->
<template>
  <div id="app">
    <traffic></traffic>
    <tmap></tmap>
    <calendar></calendar>
    <container></container>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import tmap from "./components/map";
import traffic from "./components/traffice";
import control from "./components/control";
import calendar from "./components/calendar";
import container from "./components/container";


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
    container
  },
  mounted(){
    //请求相关的数据
    //1. 监测站基本数据--经纬度、名称、标识号
    this.$axios.get("http://localhost:3000/monitor").then(res=>{
      //写入vuex
      this.$store.commit("setMonitors",res.data);
    });
    //2. 
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
</style>
