<template>
  <div class="overView" id="scrollbar">
    <div class="roadAccident">
      <overview></overview>
    </div>
    <div class="roadSpeed">
      <babelChart></babelChart>
    </div>
  </div>
</template>

<script>
import overview from "./overView2";
import babelChart from "./babelChart";
export default {
  components: {
    overview,
    babelChart
  }
};
</script>

<style scoped>
.overView {
  position: absolute;
  height: 75%;
  width: 600px;
  border: 1px solid black;
  box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.3) inset,
    0 0.5em 1em rgba(0, 0, 0, 0.1);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  display: flex;
}
.roadAccident {
  flex: 1;
}
.roadSpeed {
  flex: 1;
}
#scrollbar {
  height: 75%;
  overflow: scroll;
  overflow-x: hidden;
}
#scrollbar::-webkit-scrollbar {
  width: 3px;
  height: 1px;
}
#scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #c5c5c5;
}
#scrollbar::-webkit-scrollbar-track {
  border-radius: 10px;
}
</style>
