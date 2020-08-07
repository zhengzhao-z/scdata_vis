<!--
 * @Description: 
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
-->
<template>
  <div id="app">
    <!-- <traffic></traffic> -->
    <tmap></tmap>
    <!-- <control></control> -->
    <calendar></calendar>
    <!-- <overView></overView> -->
    <detail></detail>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import tmap from "./components/map";
import overView from "./components/overView2";
import traffic from "./components/traffice";
import control from "./components/control";
import calendar from "./components/calendar";
import detail from "./components/detail";

export default {
  name: "App",
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  components: {
    tmap,
    traffic,
    overView,
    control,
    calendar,
    detail
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
.bg{
  box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.3) inset,
    0 0.5em 1em rgba(0, 0, 0, 0.1);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
</style>
