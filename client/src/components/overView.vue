<!--
 * @Description: 
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
-->
<template>
  <div id="overview" class="bg">
    <div id="charName">
      <h3>道路阻断事件面积图/速度比例图</h3>
    </div>
    <div id="scrollbar">
      <div id="roadAccident">
        <eventArea></eventArea>
      </div>
      <div id="roadSpeed">
        <bubbleChart></bubbleChart>
      </div>
    </div>
  </div>
</template>

<script>
import eventArea from "./eventArea";
import bubbleChart from "./bubbleChart";

export default {
  components: {
    eventArea,
    bubbleChart
  },
  data() {
    return {};
  },

  mounted() {},
  methods: {}
};
</script>

<style scoped>
#overview {
  height: 800px;
  width: 450px;
  position: absolute;
  transition: all 500ms;
}
#control {
  height: 100px;
  width: 100%;
}
.el-switch {
  /* display: block; */
  margin-top: 5px;
  width: 150px;
}
#roadAccident {
  flex: 1;
}
#roadSpeed {
  flex: 1;
}
#scrollbar {
  height: calc(100% - 100px);
  overflow: scroll;
  overflow-x: hidden;
  position: absolute;
  display: flex;
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
#legend {
  position: absolute;
  width: 80px;
  height: 200px;
  right: 0;
  top: 20px;
}
</style>
