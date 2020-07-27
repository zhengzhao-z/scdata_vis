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
<<<<<<< HEAD
import OV from './components/overView'
=======
import traffic from './components/traffice'
>>>>>>> fe96848d689d6218d49c55592c66df4f7d34b122

export default {
  name: "App",
  components: {
    HelloWorld,
<<<<<<< HEAD
    OV,
    tmap
=======
    tmap,
    traffic
>>>>>>> fe96848d689d6218d49c55592c66df4f7d34b122
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
