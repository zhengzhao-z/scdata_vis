<<<<<<< HEAD

=======
<!--
 * @Description: 
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
-->
>>>>>>> 14cd39672f78f4ed77246360fbd9ae2e50614b41
<!--
 * @Description: 
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
-->
<template>
  <div id="app">
<<<<<<< HEAD
    <traffic></traffic>
    <tmap></tmap>
    <control></control>
=======
    <!-- <traffic></traffic> -->
    <!-- <tmap></tmap> -->
    <!-- <OV></OV> -->
    <input
      type="checkbox"
      id="公路施工养护"
      value="公路施工养护"
      v-model="selectedLiebie"
    />
    <label for="公路施工养护">公路施工养护</label>
    <input
      type="checkbox"
      id="车辆交通事故"
      value="车辆交通事故"
      v-model="selectedLiebie"
    />
    <label for="车辆交通事故">车辆交通事故</label>
    <input type="checkbox" id="其他" value="其他" v-model="selectedLiebie" />
    <label for="其他">其他</label>
    <br />
    <span>Checked names: {{ selectedLiebie }}</span>
    <div><button @click="sendMessage">提交</button></div>
    <calendar></calendar>
>>>>>>> 14cd39672f78f4ed77246360fbd9ae2e50614b41
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import tmap from "./components/map";
import OV from "./components/overView";
import traffic from "./components/traffice";
<<<<<<< HEAD
import control from "./components/control"

=======
import calendar from "./components/calendar";
>>>>>>> 14cd39672f78f4ed77246360fbd9ae2e50614b41
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
<<<<<<< HEAD
    control
=======
    calendar
>>>>>>> 14cd39672f78f4ed77246360fbd9ae2e50614b41
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
