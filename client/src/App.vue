<template>
  <div id="app">
    <tmap></tmap>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import tmap from './components/map'

export default {
  name: 'App',
  components: {
    HelloWorld,
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
