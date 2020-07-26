<template>
  <div id="app">
    <tmap></tmap>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import tmap from "./components/map";

export default {
  name: "App",
  components: {
    HelloWorld,
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
