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
    <calendar></calendar>

    <div id="container">
      <overView ref="overView"></overView>
      <detail ref="detail"></detail>
    </div>

    <span class="button" @click="change" ref="button">
      {{ this.arrow }}
    </span>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import tmap from "./components/map";
import overView from "./components/overView";
import traffic from "./components/traffice";
import control from "./components/control";
import calendar from "./components/calendar";
import detail from "./components/detail";

export default {
  name: "App",
  data() {
    return {
      flag: false,
      arrow: "<",
      calendarMin: 0,
      calendarMax: 0
    };
  },
  methods: {
    getCalendarData() {
      this.$store.dispatch("changeCalendarAllData");
    },

    change() {
      this.$store.commit("setOver", true);
    }
  },
  mounted() {
    this.getCalendarData();
  },
  computed: {
    over() {
      return this.$store.state.over;
    }
  },
  watch: {
    over(val, nval) {
      if (val == false) {
        //隐藏
        this.$refs.overView.$el.style.transform = "translateX(-500px)";
        this.$refs.detail.$el.style.transform = "translateX(-500px)";
      } else {
        //显示
        this.$refs.overView.$el.style.transform = "translateX(0px)";
        this.$refs.detail.$el.style.transform = "translateX(0px)";
      }
    }
  },
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
.bg {
  box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.3) inset,
    0 0.5em 1em rgba(0, 0, 0, 0.1);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
.button {
  position: absolute;
  left: 470px;
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
#container {
  height: 75%;
  width: 500px;
  position: absolute;
  overflow: hidden;
}
</style>
