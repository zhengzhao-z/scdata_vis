<!--
 * @Description: 某条道路的详细情况
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
--> 
<template>
  <div id="detail" class="bg">
    <div id="control">
      <el-switch v-model="value" active-text="全部" ></el-switch>
      <el-switch v-model="value" active-text="车辆交通事故" :active-color="color[0]"></el-switch>
      <el-switch v-model="value" active-text="车流量大" :active-color="color[1]"></el-switch>
      <el-switch v-model="value" active-text="降雨（积水）" :active-color="color[2]"></el-switch>
      <el-switch v-model="value" active-text="降雪（积雪）" :active-color="color[3]"></el-switch>
      <el-switch v-model="value" active-text="雾霾" :active-color="color[4]"></el-switch>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: d3.schemeCategory10,
      order:["车辆交通事故","车流量大","降雨（积水）","降雪（积雪）","雾霾"],
      value:true
    };
  },
  mounted() {
    this.$axios
      .post("http://localhost:3000/detail", {
        road: "G5",
      })
      .then((res) => {
        this.process(res.data);
      });
  },
  methods: {
    //数据处理
    process(data) {
      let road = {};
      let edges = {};
      for (let i = 0; i < data.length; i++) {
        let stake = parseInt(
          parseInt(data[i].START_STAKE.replace(/,/g, "")) / 1000
        );
        let reason = data[i].BLOCK_REASON,
          measure = data[i].MEASURES_NAME;
        if (!road[stake]) {
          road[stake] = {};
        }
        if (!road[stake][reason]) {
          road[stake][reason] = 1;
        } else {
          road[stake][reason] += 1;
        }
        // sankey
        if(this.order.includes(reason)){
         
          let key = reason + "-" + measure;
          if (edges[key]) {
            edges[key] += 1;
          } else {
            edges[key] = 1;
          }
        }
      }
      let edge = [],
        node = [];
      for (let item in edges) {
        let nod = item.split("-");
        node.push(nod[0]);
        node.push(nod[1]);
        edge.push({ source: nod[0], target: nod[1], value: edges[item] });
      }
      node = Array.from(new Set(node));
      this.draw(road, {
        nodes: node.map((d) => {
          return { name: d };
        }),
        links: edge,
      });
    },
    //绘制
    draw(data, data1) {
      let svg = d3
        .select(this.$el)
        .append("svg")
        .attr("width", 500)
        .attr("height", 600);
      let scale = d3
        .scaleLinear()
        .domain([1464, 2500]) //道路的起止桩号
        .range([0, 400]);
      let scale1 = d3.scaleLinear().domain([0, 300]).range([200, 50]);
      svg
        .append("g")
        .append("line")
        .attr("x1", 10)
        .attr("y1", 200)
        .attr("x2", 410)
        .attr("y2", 200)
        .attr("stroke", "black");
      svg
        .append("g")
        .selectAll("rect")
        .data(Object.entries(data))
        .enter()
        .append("rect")
        .attr("x", (d) => {
          // let stake=parseInt(d[0].replace(/,/g,""));
          return scale(d[0]);
        })
        .attr("y", (d) => {
          return scale1(this.sum(Object.values(d[1])));
          // if(d[1]["车辆交通事故"]){
          //   return scale1(d[1]["车辆交通事故"]);
          // }else{
          //   return 200
          // }
        })
        .attr("width", 2.5)
        .attr("height", (d) => {
          // if(d[1]["车辆交通事故"]){
          //   return 200-scale1(d[1]["车辆交通事故"]);
          // }else{
          //   return 0
          // }
          return 200 - scale1(this.sum(Object.values(d[1])));
        })
        .attr("fill", "#409EFF");

      //sankey
      let sankey = d3
        .sankey()
        .nodeId((d) => d.name)
        .nodeWidth(12)
        .nodePadding(20)
        .size([400, 250]);
      let { nodes, links } = sankey(data1);
      let g=svg.append("g")
        .attr("transform","translate(10,300)");
      const node = g.append("g").selectAll("rect").data(nodes);
      node
        .join("rect")
        .attr("x", (d) => d.x0)
        .attr("y", (d) => d.y0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("width", (d) => d.x1 - d.x0)
        .attr("fill", (d) => d.color)
        .attr("stroke", "none");
      node
        .join("text")
        .attr("x", (d) => d.x0 + 15)
        .attr("y", (d) => d.y0 + (d.y1 - d.y0) / 2 + 5)
        .text((d) => d.name)
        .attr("font-size", "14px");
      const link = g
        .append("g")
        .attr("fill", "none")
        .attr("stroke-opacity", 0.8)
        .selectAll("g")
        .data(links)
        .join("g")
        .style("mix-blend-mode", "multiply");

      link
        .append("path")
        .attr("d", d3.sankeyLinkHorizontal())
        .attr("stroke", "#ccc")
        .attr("stroke-width", (d) => Math.max(1, d.width));
    },
    sum(arr) {
      let sum = 0;
      arr.forEach((d) => {
        sum += d;
      });
      return sum;
    },
  },
};
</script>

<style>
#detail {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 100%;
  transition: all 500ms;
}
.el-switch {
  /* display: block; */
  margin-top: 5px;
  width: 150px;
}
</style>