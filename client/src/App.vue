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
    <!-- <control></control> -->
    <calendar></calendar>
    <overView></overView>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import tmap from "./components/map";
import OV from "./components/overView";
import overView from "./components/overView2";
import traffic from "./components/traffice";
import control from "./components/control";
import calendar from "./components/calendar";

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
    calendar
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
</style>
