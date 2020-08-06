<template>
  <div class="overView" id="scrollbar">
    <div id="scollbar">
      <div class="roadAccident">
        <overview></overview>
      </div>
      <div class="roadSpeed"></div>
    </div>
  </div>
</template>

<script>
import overview from "./overView2";
export default {
  components: {
    overview
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
