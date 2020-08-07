<template>
  <div id="scrollbar">
    <div class="roadAccident">
      <overview></overview>
    </div>
    <div class="roadSpeed">
      <bubbleChart></bubbleChart>
    </div>
  </div>
</template>

<script>
import overview from "./overView2";
import bubbleChart from "./bubbleChart";
export default {
  components: {
    overview,
    bubbleChart
  }
};
</script>

<style scoped>
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
