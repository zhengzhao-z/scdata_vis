<!--
 * @Description: 
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
-->
<template>
  <div id="overview" class="bg">
    <!-- <div id="charName">
      <h3>道路阻断事件面积图/速度比例图</h3>
    </div> -->
    <div id="scrollbar">
      <div id="roadAccident">
        <eventArea></eventArea>
      </div>
      <div id="roadSpeed">
        <bubbleChart></bubbleChart>
      </div>
    </div>
    <div id="legend" ref="legend"></div>
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
    return {
      color: ["#123597", "#49C628", "#F8D800", "#9F44D3", "#F6416C", "#00EAFF"],
      legendName: ["00-60", "61-80", "81-100", "101-120", "120+"]
    };
  },

  mounted() {
    this.legenChartInit();
  },
  methods: {
    legenChartInit() {
      //legend
      let svg = d3
        .select(this.$refs.legend)
        .append("svg")
        .attr("height", 200)
        .attr("width", 80);
      svg
        .append("g")
        .selectAll("rect")
        .data(this.legendName)
        .enter()
        .append("rect")
        .attr("width", 55)
        .attr("height", 20)
        .attr("ry", 10)
        .attr("x", 0)
        .attr("y", (d, i) => {
          return i * 30;
        })
        .attr("fill", (d, i) => {
          return this.color[i];
        });
      svg
        .append("g")
        .selectAll("text")
        .data(this.legendName)
        .enter()
        .append("text")
        .attr("x", 0)
        .attr("dx", (d, i) => {
          if (i == 0 || i == 1) {
            return 10;
          } else if (i == 2) {
            return 5;
          } else if (i == 3) {
            return 1;
          } else if (i == 4) {
            return 10;
          }
        })
        .attr("y", (d, i) => {
          return i * 30 + 15;
        })
        .attr("font-size", "13px")
        .text(d => d)
        .attr("fill", "white");
    }
  }
};
</script>

<style scoped>
#overview {
  height: calc(100% - 250px);
  width: 450px;
  position: absolute;
  transition: all 500ms;
}
.el-switch {
  /* display: block; */
  margin-top: 5px;
  width: 150px;
}
#roadAccident {
  flex: 1.5;
}
#roadSpeed {
  flex: 1;
}
#scrollbar {
  height: 100%;
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
