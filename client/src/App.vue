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
    <control></control>
    <!-- <overView></overView>   -->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import tmap from "./components/map";
import OV from "./components/overView";
import traffic from "./components/traffice";
import control from "./components/control"
import calendar from "./components/calendar";
import overView from "./components/overView"
export default {
  name: "App",
  data() {
   return{}
  },
  methods: {
    
  },
  mounted() {},
  components: {
    HelloWorld,
    tmap,
    traffic,
    OV,
    control,
    calendar,
    overView
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
