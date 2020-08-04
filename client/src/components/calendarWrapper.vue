<template>
  <div class="wrapper">
    <calendar :month="month" :x="x"></calendar>
    <button @click="change">{{ arrow }}</button>
  </div>
</template>

<script>
import calendar from "./calendar";
export default {
  data() {
    return {
      arrow: ">",
      month: ["2019-01-01", "2019-03-31"],
      x: false
    };
  },
  components: {
    calendar
  },
  methods: {
    change() {
      if (this.arrow === ">") {
        this.arrow = "<";
        this.month = ["2019-04-01", "2019-06-30"];
        this.x = true;
      } else {
        this.arrow = ">";
        this.month = ["2019-01-01", "2019-03-31"];
        this.x = false;
      }
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
}
button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  line-height: 15px;
  cursor: pointer;
}
</style>
