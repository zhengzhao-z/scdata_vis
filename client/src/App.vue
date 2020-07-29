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
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import tmap from "./components/map";
import OV from "./components/overView";
import traffic from "./components/traffice";
import control from "./components/control"
import calendar from "./components/calendar";

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
<<<<<<< HEAD
    OV,
    tmap
=======
    tmap,
    traffic,
    OV,
    control,
    calendar
>>>>>>> 00cad3bbecfcbbb6b56e630793798e28a9b9a223
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
