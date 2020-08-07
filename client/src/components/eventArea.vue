<!--
 * @Description: 
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
-->
<template>
  <div id="area">
    <div ref="charts" class="charts"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
      color: d3.schemeCategory10,
      road: ["G5", "G42", "G76", "G85", "G93", "G0512", "G4215","S40","S1","S4202","S2","G75"], //道路的排列顺序
      order: [
        "车辆交通事故",
        "车流量大",
        "降雨（积水）",
        "降雪（积雪）",
        "雾霾"
      ] //事件顺序
    };
  },
  mounted() {
    this.$axios.get("../static/road.json").then(res => {
      this.process(res.data);
    });
  },
  methods: {
    //处理数据
    process(data) {
      let area = [];
      for (let i = 0; i < this.road.length; i++) {
        let arr = data[this.road[i]];
        let stack = [];
        let last = [];
        for (let i = 0; i < this.order.length; i++) {
          stack[i] = arr.map((d, j) => {
            if (!d) {
              //该小时无数据
              return [0, 0];
            }
            if (i == 0) {
              last[j] = d[this.order[i]];
              return [0, d[this.order[i]]];
            } else {
              let tmp = [last[j], last[j] + d[this.order[i]]];
              last[j] = last[j] + d[this.order[i]];
              return tmp;
            }
          });
        }
        area.push(stack);
      }
      this.draw(area);
    },
    //绘制
    draw(data) {
      let svg = d3
        .select(this.$refs.charts)
        .append("svg")
        .attr("width", "100%")
        .attr("height", 12*142); //根据道路数量自动计算
      let scale = d3
        .scaleLinear()
        .domain([0, 161])
        .range([130, 0]);  //算最大值
      let area = d3
        .area()
        .curve(d3.curveCardinal)
        .x((d, i) => {
          return i * 10 + 15;
        })
        .y0(d => scale(d[0]))
        .y1(d => scale(d[1]));
      for (let i = 0; i < data.length; i++) {
        let arr = data[i];
        let g = svg
          .append("g")
          .attr("transform", "translate(0," + (i * 142) + ")");
        g.selectAll("path")
          .data(arr)
          .join("path")
          .attr("d", area)
          .attr("fill", (d, i) => {
            return d3.schemeCategory10[i];
          });
        g.append("text")
          .attr("x", 20)
          .attr("y", 30)
          .attr("fill", "#409EFF")
          .text(this.road[i])
          .on("click",d=>{
            //todo 
            this.$store.commit("setOver", false);
          })
          .style("cursor", "pointer")
        g.append("g")
          .selectAll("text")
          .data([0, 8, 16])
          .enter()
          .append("text")
          .attr("x", d => d * 10 + 15)
          .attr("y", 142)
          .attr("font-size", "12")
          .text(d => d);
      }
    },
    //数组求和
    sum(arr) {
      let sum = 0;
      arr.forEach(d => {
        sum += d;
      });
      return sum;
    }
  }
};
</script>

<style>
#area {
  width: 100%;
}
#area #control {
  position: absolute;
  right: 0px;
  top: 30px;
}

</style>
