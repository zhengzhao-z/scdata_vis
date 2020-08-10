<!--
 * @Description: 某条道路的详细情况
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
-->
<template>
  <div id="detail">
    <div id="sankey" ref="sankey"></div>
    <div id="jam">
      <div id="monitors">
        <div class="item" v-for="(item,i) in monitors" v-bind:key="i" @click="test(item.GCZBS)">
          <span>{{ item.name }}</span>
        </div>
      </div>
      <div id="chart"></div>
    </div>
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
        "车辆交通事故": "#1D6FA3",
        "车流量大": "#49C628",
        "降雨（积水）": "#FCCF31",
        "降雪（积雪）": "#C346C2",
        "雾霾": "#F6416C",
      },
      monitors:[{"name":"资中","GCZBS":"xxxxxxx"},{"name":"资中","GCZBS":"xxxxxxx"}]
    };
  },
  mounted() {
    //基本初始化
    let sankey = d3
      .sankey()
      .nodeId((d) => d.name)
      .nodeWidth(12)
      .nodePadding(20)
      .size([380, 300]);
    this.sankey = sankey;
    this.sankeySvg = d3
      .select(this.$refs.sankey)
      .append("svg")
      .attr("width", 500)
      .attr("height", 350);
    this.$axios
      .post("http://localhost:3000/detail", {
        road: "G5",
      })
      .then((res) => {
        this.process(res.data);
      });
    // this.$axios
    //   .get("./static/block_51000020120412204940202000110105.json")
    //   .then(res => {
    //     this.chartInit(res.data);
    //   });
  },
  methods: {
    test(e){
      console.log(e)
    },
    //数据处理
    process(data) {
      //todo 数据处理放在后台
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

      this.drawSankey({
        nodes: node.map((d) => {
          return { name: d };
        }),
        links: edge,
      });
    },
    //绘制
    draw(data, data1) {},
    sum(arr) {
      let sum = 0;
      arr.forEach((d) => {
        sum += d;
      });
      return sum;
    },
    //桑基图绘制
    drawSankey(data) {
      let sankey = this.sankey;
      let svg = this.sankeySvg;

      let { nodes, links } = sankey(data);
      let g = svg.append("g").attr("transform", "translate(50,30)");
      const node = g.append("g").selectAll("rect").data(nodes);
      node
        .join("rect")
        .attr("x", (d) => d.x0)
        .attr("y", (d) => d.y0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("width", (d) => d.x1 - d.x0)
        .attr("fill", (d) => {
          if (this.color[d.name]) {
            return this.color[d.name];
          } else {
            return "#409EFF";
          }
        })
        .style("stroke", "black")
        .on("mouseover", (d) => {
          let thisName = d.name;
          svg.selectAll("rect").style("opacity", (d) => {
            return this.highlightNodes(d, thisName);
          });
          svg.selectAll(".sankey-link").style("opacity", function (l) {
            return l.source.name == thisName || l.target.name == thisName
              ? 1
              : 0.3;
          });
          svg.selectAll("text").style("opacity", (d) => {
            return this.highlightNodes(d, thisName);
          });
        })
        .on("mouseout", (d) => {
          svg.selectAll("rect").style("opacity", 1);
          svg.selectAll(".sankey-link").style("opacity", 0.7);
          svg.selectAll("text").style("opacity", 1);
        });
      node
        .join("text")
        .attr("x", (d) => (d.x0 + d.x1) / 2)
        .attr("y", (d) => d.y0 - 5)
        .attr("text-anchor", "middle")
        .text((d) => d.name)
        .attr("font-size", "14px");
      const link = g
        .append("g")
        .attr("fill", "none")
        .attr("stroke-opacity", 0.5)
        .selectAll("g")
        .data(links)
        .join("g")
        .style("mix-blend-mode", "multiply");
      link
        .append("path")
        .style("opacity", "0.7")
        .attr("class", "sankey-link")
        .attr("d", d3.sankeyLinkHorizontal())
        .attr("stroke", (d) => this.color[d.source.name])
        .attr("stroke-width", (d) => Math.max(1, d.width));
    },
    //sankey 高亮
    highlightNodes(node, name) {
      let opacity = 0.3;

      if (node.name == name) {
        opacity = 1;
      }
      node.sourceLinks.forEach(function (link) {
        if (link.target.name == name) {
          opacity = 1;
        }
      });
      node.targetLinks.forEach(function (link) {
        if (link.source.name == name) {
          opacity = 1;
        }
      });

      return opacity;
      console.log(opacity);
    },
    //echarts -- 拥堵曲线
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
            data: data[1],
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

<style scoped>
#detail {
  height: 100%;
  width: 100%;
  position: absolute;
  /* left: 100%; */
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
#monitors{
  width: 60px;
  height: 250px;
  float: left;
}
#chart{
  width: 435px;
  height: 300px;
  float: left;
  border: 1px solid black;
}
#monitors .item{
  height: 25px;
  width: 60px;
  border: 1px solid black;
  border-radius: 10px;
  text-align: center;
  margin-top: 5px;
  cursor: pointer;
  overflow: hidden;
  font-size:13px ;
  line-height: 25px;
}
#monitors .item:hover{
  background: cornflowerblue;
}
</style>
