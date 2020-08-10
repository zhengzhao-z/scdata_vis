<template>
  <div id="container" class="bg">
		<mySwitch></mySwitch>
    <!-- <overView ref="overView"></overView> -->
    <detail ref="detail"></detail>
  </div>
</template>

<script>
import overView from "./overView";
import detail from "./detail";
import mySwitch from "./mySwitch";
export default {
	components:{
		overView,
		detail,
		mySwitch
	},
  data() {
    return {
      flag: false,
      arrow: "<",
      calendarMin: 0,
      calendarMax: 0,
    };
  },
  methods: {
    getCalendarData() {
      this.$store.dispatch("changeCalendarAllData");
    },

    change() {
      this.$store.commit("setOver", true);
    },
  },
  mounted() {
    this.getCalendarData();
  },
  computed: {
    over() {
      return this.$store.state.over;
    },
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
    },
  },
};
</script>

<style>
#container {
  height: 75%;
  width: 500px;
  position: absolute;
  overflow: hidden;
}
</style>