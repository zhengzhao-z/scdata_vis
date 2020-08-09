<!--
 * @Description: 某条道路的详细情况
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
--> 
<template>
  <div id="detail" class="bg">
    <div id="control">
      <el-switch v-model="value" active-text="全部"></el-switch>
      <el-switch v-model="value" active-text="车辆交通事故" :active-color="color1[0]"></el-switch>
      <el-switch v-model="value" active-text="车流量大" :active-color="color1[1]"></el-switch>
      <el-switch v-model="value" active-text="降雨（积水）" :active-color="color1[2]"></el-switch>
      <el-switch v-model="value" active-text="降雪（积雪）" :active-color="color1[3]"></el-switch>
      <el-switch v-model="value" active-text="雾霾" :active-color="color1[4]"></el-switch>
    </div>
    <div ref="jam" id="jam"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color1: d3.schemeCategory10,
      order: [
        "车辆交通事故",
        "车流量大",
        "降雨（积水）",
        "降雪（积雪）",
        "雾霾",
      ],
      color: {
        车辆交通事故: "#1D6FA3",
        车流量大: "#49C628",
        "降雨（积水）": "#FCCF31",
        "降雪（积雪）": "#C346C2",
        雾霾: "#F6416C",
      },
      value: true,
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
    this.$axios
      .get("./static/block_51000020120412204940202000110105.json")
      .then(res=>{
        this.chartInit(res.data);
      })
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
        if (this.order.includes(reason)) {
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
      // let scale = d3
      //   .scaleLinear()
      //   .domain([1464, 2500]) //道路的起止桩号
      //   .range([0, 400]);
      // let scale1 = d3.scaleLinear().domain([0, 300]).range([200, 50]);
      // svg
      //   .append("g")
      //   .append("line")
      //   .attr("x1", 10)
      //   .attr("y1", 200)
      //   .attr("x2", 410)
      //   .attr("y2", 200)
      //   .attr("stroke", "black");
      // svg
      //   .append("g")
      //   .selectAll("rect")
      //   .data(Object.entries(data))
      //   .enter()
      //   .append("rect")
      //   .attr("x", (d) => {
      //     return scale(d[0]);
      //   })
      //   .attr("y", (d) => {
      //     return scale1(this.sum(Object.values(d[1])));
      //   })
      //   .attr("width", 2.5)
      //   .attr("height", (d) => {
      //     return 200 - scale1(this.sum(Object.values(d[1])));
      //   })
      //   .attr("fill", "#409EFF");

      //sankey
      let sankey = d3
        .sankey()
        .nodeId((d) => d.name)
        .nodeWidth(12)
        .nodePadding(20)
        .size([400, 250]);
      let { nodes, links } = sankey(data1);
      let g = svg.append("g").attr("transform", "translate(10,30)");
      const node = g.append("g").selectAll("rect").data(nodes);
      node
        .join("rect")
        .attr("x", (d) => d.x0)
        .attr("y", (d) => d.y0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("width", (d) => d.x1 - d.x0)
        .attr("fill", (d) => this.color[d.name])
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
        .attr("stroke-opacity", 0.3)
        .selectAll("g")
        .data(links)
        .join("g")
        .style("mix-blend-mode", "multiply");

      link
        .append("path")
        .attr("d", d3.sankeyLinkHorizontal())
        .attr("stroke", (d) => this.color[d.source.name])
        .attr("stroke-width", (d) => Math.max(1, d.width));
    },
    sum(arr) {
      let sum = 0;
      arr.forEach((d) => {
        sum += d;
      });
      return sum;
    },
    chartInit(data) {
      const chartDom = this.$refs.jam;
      this.chart = this.$echarts.init(chartDom);
      let option;
      this.chart.setOption(
        (option = {
          title: {
            text: "拥堵曲线",
          },
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            data: data[1]
          },
          yAxis: {
            splitLine: {
              show: false,
            },
          },
          toolbox: {
            left: "center",
            feature: {
              dataZoom: {
                yAxisIndex: "none",
              },
              restore: {},
              saveAsImage: {},
            },
          },
          dataZoom: [
            {
              startValue: "2014-06-01",
            },
            {
              type: "inside",
            },
          ],
          visualMap: {
            top: 10,
            right: 10,
            pieces: [
              {
                gt: 0,
                lte: 50,
                color: "#096",
              },
              {
                gt: 50,
                lte: 100,
                color: "#ffde33",
              },
              {
                gt: 100,
                lte: 150,
                color: "#ff9933",
              },
              {
                gt: 150,
                lte: 200,
                color: "#cc0033",
              },
              {
                gt: 200,
                lte: 300,
                color: "#660099",
              },
              {
                gt: 300,
                color: "#7e0023",
              },
            ],
            outOfRange: {
              color: "#999",
            },
          },
          series: {
            name: "Beijing AQI",
            type: "line",
            data: data[0],
            markLine: {
              silent: true,
              data: [
                {
                  yAxis: 50,
                },
                {
                  yAxis: 100,
                },
                {
                  yAxis: 150,
                },
                {
                  yAxis: 200,
                },
                {
                  yAxis: 300,
                },
              ],
            },
          },
        })
      );
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
#jam {
  width: 100%;
  height: 400px;
}
.el-switch {
  /* display: block; */
  margin-top: 5px;
  width: 150px;
}
</style>