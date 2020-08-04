<!--
 * @Description: 
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
-->
<template>
  <div id="app">
    <calendarWrapper></calendarWrapper>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import tmap from "./components/map";
import OV from "./components/overView";
import traffic from "./components/traffice";
import control from "./components/control";
import calendarWrapper from "./components/calendarWrapper";

export default {
  name: "App",
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  components: {
    HelloWorld,
    tmap,
    traffic,
    OV,
    control,
    calendarWrapper
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
