<!--
 * @Description: 
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
-->
<template>
  <div id="app">
    <!-- <traffic></traffic> -->
    <tmap></tmap>
    <!-- <control></control> -->
    <calendar></calendar>

    <overView class="overView" ref="overView"></overView>
    <span class="button" @click="change" ref="button">
      {{ this.arrow }}
    </span>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import tmap from "./components/map";
import OV from "./components/overView";
import overView from "./components/overView3";
import traffic from "./components/traffice";
import control from "./components/control";
import calendar from "./components/calendar";
import detail from "./components/detail";

export default {
  name: "App",
  data() {
    return {
      flag: false,
      arrow: "<"
    };
  },
  methods: {
    change() {
      console.dir(this.$refs.button);
      if (!this.flag) {
        this.$refs.overView.$el.style.transform = "translateX(-600px)";
        this.$refs.button.style.transform = "translateX(-570px)";
        this.flag = true;
        this.arrow = ">";
      } else {
        this.$refs.overView.$el.style.transform = "translateX(0)";
        this.$refs.button.style.transform = "translateX(0)";
        this.flag = false;
        this.arrow = "<";
      }
    }
  },
  mounted() {},
  components: {
    tmap,
    traffic,
    overView,
    control,
    calendar,
    detail
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
#app {
  position: relative;
}

.overView {
  position: absolute;
  height: 75%;
  width: 500px;
  box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.3) inset,
    0 0.5em 1em rgba(0, 0, 0, 0.1);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  display: flex;
  transition: all 500ms;
}
.button {
  position: absolute;
  left: 570px;
  top: 600px;
  width: 30px;
  height: 30px;
  transition: all 500ms;
  outline: none;
  border: 1px solid #ccc;
  cursor: pointer;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  background: #f5f4ef;
  color: #589ef8;
  font-weight: 700;
}
.button:hover {
  background: yellowgreen;
  color: black;
  width: 32px;
  height: 32px;
}
</style>
