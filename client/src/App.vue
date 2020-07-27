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
  name: 'App',
  components: {
    HelloWorld,
    tmap,
    traffic
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
