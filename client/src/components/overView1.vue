<!--
 * @Description: 概览不同道路 不同事件
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
--> 
<template>
  <div id="overView"></div>
</template>

<script>
export default {
  data() {
    return {
      color: d3.schemeCategory10,
    };
  },
  mounted() {
    this.$axios.get("../static/static.json").then((res) => {
      this.process(res.data.overview);
    });
  },
  methods: {
    //数据处理
    process(data) {
      let event = {},
        road = {};
      data.forEach((d) => {
        if (!event[d.blockReason]) {
          event[d.blockReason] = parseInt(d.number);
        } else {
          event[d.blockReason] += parseInt(d.number);
        }
        if (!road[d.roadCode]) {
          road[d.roadCode] = {
            detail: [d],
            count: parseInt(d.number),
          };
        } else {
          road[d.roadCode].detail.push(d);
          road[d.roadCode].count += parseInt(d.number);
        }
      });
      this.draw(event, road);
    },
    //绘图
    draw(event, road) {
      const svg = d3
        .select(this.$el)
        .append("svg")
        .attr("width", 600)
        .attr("height", 250);
      let arr = Object.entries(road).sort((a,b)=>b[1].count - a[1].count).slice(0,10);
      console.log(arr)
      let scale = d3.scaleLinear()
        .domain([0, arr[0][1].count])
        .range([0, 220]);
      
      var pie = d3.pie().padAngle(0.02)
        .value(d=>d[1])
        (Object.entries(event).slice(0,10).sort((a,b)=>b[1]-a[1]));
      var arc = d3.arc().innerRadius(70).outerRadius(100);
      svg.append("g")
        .attr("transform","translate(100,100)")
        .selectAll("path")
        .data(pie)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => this.color[i]);
      svg.append("g")
        .attr("transform","translate(220,0)")
        .selectAll("rect")
        .data(arr)
        .enter()
        .append("rect")
        .attr("x",(d,i) => i*30)
        .attr("y",d => 220-scale(d[1].count))
        .attr("width",25)
        .attr("height",d => scale(d[1].count))
        .attr("fill","rgb(41,170,227)");
      svg.append("g")
        .attr("transform","translate(220,0)")
        .selectAll("text")
        .data(arr)
        .enter()
        .append("text")
        .attr("x",(d,i) => i*30)
        .attr("y",240)
        .attr("width",30)
        .attr("font-size","10")
        .text(d=>d[0])
      console.log(arr[9][1].count)
    },
  },
};
</script>

<style>
#overView {
  width: 600px;
  height: 250px;
  border: 1px solid black;
}
</style>