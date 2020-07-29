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
    <OV></OV>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import tmap from './components/map'
import OV from './components/overView'

export default {
  name: "App",
  components: {
    HelloWorld,
    OV,
    tmap
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
