<template>
  <div id="app">
    <tmap></tmap>
    <OV></OV>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import tmap from './components/map'
import OV from './components/overView'

export default {
  name: 'App',
  components: {
    HelloWorld,
    OV,
    tmap
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
