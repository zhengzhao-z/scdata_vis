
<!--
 * @Description: 道路事故多发路段危险分级
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
-->
<template>
  <div id="risk-container" class="bg">
    <div class="title" @click="change">{{name}}道路危险程度曲线</div>
    <canvas id="risk" ref="risk" width="800" height="300"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "G5",
    };
  },
  mounted() {
    let canvas = this.$refs.risk;
    let ctx = canvas.getContext("2d");
    this.ctx = ctx;
  },
  computed: {
    risk() {
      return this.$store.state.risk;
    },
    road() {
      return this.$store.state.roadName;
    },
  },
  methods: {
    drawRisk(arr) {
      let data = {};
      arr.forEach((obj) => {
        let d = obj.START_STAKE;
        let stake = parseInt(parseInt(d.replace(/,/g, "")) / 100);
        if (stake != 0 && stake != 1) {
          for (let i = stake - 60; i <= stake + 60; i++) {
            if (data[i]) {
              data[i] += this.guass(i, stake);
            } else {
              data[i] = this.guass(i, stake);
            }
          }
        }
      });
      let max = Math.max(...Object.keys(data)),
        min = Math.min(...Object.keys(data));
      let scale = d3.scaleLinear().domain([min, max]).range([50, 800]);
      let scale1 = d3.scaleLinear().domain([0, 30]).range([200, 50]);
      let ctx = this.ctx;
      ctx.clearRect(0, 0, 800, 300);
      ctx.beginPath();
      // ctx.moveTo(0,0);
      for (let i = min; i <= max; i++) {
        if (data[i]) {
          ctx.lineTo(scale(i), scale1(data[i]));
        } else {
          ctx.lineTo(scale(i), 200);
        }
      }

      ctx.strokeStyle = "#409EFF";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
      //坐标轴
      ctx.beginPath();
      ctx.moveTo(50, 200);
      ctx.lineTo(50, 50);
      ctx.strokeStyle = "#aaa";
      ctx.stroke();
      ctx.font = '13px "微软雅黑"';
      // ctx.fillS
      ctx.fillText("危险值", 0, 50);
      ctx.closePath();
      ctx.beginPath();
      ctx.setLineDash([8, 8]);
      ctx.moveTo(50, scale1(10));
      ctx.lineTo(800, scale1(10));
      ctx.fillText("10", 20, scale1(10) + 5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(50, scale1(20));
      ctx.lineTo(800, scale1(20));
      ctx.fillText("20", 20, scale1(20) + 5);
      ctx.stroke();
      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.moveTo(50, scale1(0));
      ctx.lineTo(800, scale1(0));
      ctx.stroke();
      ctx.fillText("起始路桩", 25, 220);
      ctx.fillText("结束路桩", 745, 220);
    },
    guass(x, x0) {
      return (3 / 30) * Math.pow(Math.E, (x - x0) ** 2 / (-2 * 30 ** 2)) * 10;
    },
    change() {
      this.$store.commit("changeMapShow", 1);
    },
  },
  watch: {
    risk(n, o) {
      this.drawRisk(n);
    },
    road(n, o) {
      if (n == "all") {
        this.name = "G5";
      } else {
        this.name = n;
        this.$axios
          .post("http://localhost:3000/risk", {
            road: n,
          })
          .then((res) => {
            this.$store.commit("setRisk", res.data);
          });
      }
    },
  },
};
</script>

<style scoped>
#risk {
  width: 800px;
  height: 250px;
}
#risk-container {
  position: absolute;
  left: 500px;
  bottom: 0px;
  height: 280px;
}
</style>