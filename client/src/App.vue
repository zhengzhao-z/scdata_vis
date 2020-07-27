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
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import tmap from './components/map'
import traffic from './components/traffice'

export default {
  name: "App",
  components: {
    HelloWorld,
    tmap,
    traffic
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
</style>
