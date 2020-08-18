<!--
 * @Description: 
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
-->
<template>
  <div id="overview" class="bg">
    <div class="title" style="height:30px;line-height:30px">
        道路阻断事件面积图/速度比例图
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
  methods: {
  }
};
</script>

<style scoped>
#overview {
  height: calc(100% - 250px);
  width: 500px;
  position: absolute;
  transition: all 500ms;
}
.el-switch {
  /* display: block; */
  margin-top: 5px;
  width: 150px;
}
#roadAccident {
  /* width:270px; */
}
#roadSpeed {
  /* width:200px; */
}
#scrollbar {
  height: calc(100% - 30px);
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
