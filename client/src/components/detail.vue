<!--
 * @Description: 某条道路的详细情况
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
-->
<template>
  <div id="detail" class="bg">
    <div id="back" @click="back">></div>
    <div id="monitors">
      <div class="item" v-for="(item,i) in monitors" v-bind:key="i" @click="test(item.GCZBS)">
        <span>{{ item.GCZMC }}</span>
      </div>
    </div>
    <traffic></traffic>
  </div>
</template>

<script>
import traffic from "./traffice";
export default {
  components: {
    traffic,
  },
  data() {
    return {
      monitors: [],
    };
  },
  mounted() {
    //monitors默认设置为G5
    console.log(this.$store.state.risk);

    //canvas
    let canvas = this.$refs.risk;
    let ctx = canvas.getContext("2d");
    this.ctx = ctx;
    //基本初始化
    // let sankey = d3
    //   .sankey()
    //   .nodeId((d) => d.name)
    //   .nodeWidth(12)
    //   .nodePadding(20)
    //   .size([380, 300]);
    // this.sankey = sankey;
    // this.sankeySvg = d3
    //   .select(this.$refs.sankey)
    //   .append("svg")
    //   .attr("width", 500)
    //   .attr("height", 350);
    // this.$axios
    //   .post("http://localhost:3000/detail", {
    //     road: "G5",
    //   })
    //   .then((res) => {
    //     this.process(res.data);
    //   });
    // this.$axios
    //   .get("./static/block_51000020120412204940202000110105.json")
    //   .then(res => {
    //     this.chartInit(res.data);
    //   });
  },
  computed: {
    road() {
      return this.$store.state.roadName;
    },
  },
  watch: {
    road(n, o) {
      if (n == "all") {
        return;
      } else {
        let arr = this.$store.state.monitors;
        this.monitors = [];
        arr.forEach((d) => {
          if (d.ROADCODE == n) {
            this.monitors.push(d);
          }
        });
        if (this.monitors.length != 0) {
          //默认显示第一个监测站数据
          this.$axios
            .post("http://localhost:3000/traffic", {
              id: this.monitors[0].GCZBS,
              date: "2019-04-30 00:00:00",
            })
            .then((res) => {
              // console.log(res.data)
              this.chartInit(res.data[0]);
            });
        }
      }
    },
  },
  methods: {
    test(e) {
      console.log(e);
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
    sum(arr) {
      let sum = 0;
      arr.forEach((d) => {
        sum += d;
      });
      return sum;
    },
    //echarts -- 拥堵曲线
    chartInit(data) {
      // console.log(data)
      let date = [],
        arr = [];
      data.forEach((d, i) => {
        date[i] = i;
        let speed, gcbfb, jj, zyl;
        speed = d.speed - 40;
        if (speed < 0) {
          speed = 0;
        } else if (speed > 50) {
          speed = 50;
        }
        speed = 1 - speed / 50;
        jj = d.jj;
        if (jj > 200) {
          jj = 200;
        }
        jj = 1 - jj / 200;
        gcbfb = d.gcbfb / 100;
        zyl = d.zyl / 10;
        // console.log(jj,gcbfb,speed,zyl)
        arr[i] = jj * gcbfb * speed * zyl;
      });
      // console.log(arr);
      const chartDom = this.$refs.chart;
      this.chart = this.$echarts.init(chartDom);
      let option;
      this.chart.setOption(
        (option = {
          title: {
            text: "拥堵曲线",
            left: 20,
          },
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            data: date,
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
                lte: 0.2,
                color: "#096",
              },
              {
                gt: 0.2,
                lte: 0.4,
                color: "#ffde33",
              },
              {
                gt: 0.4,
                lte: 0.6,
                color: "#ff9933",
              },
              {
                gt: 0.6,
                lte: 0.8,
                color: "#cc0033",
              },
              {
                gt: 0.8,
                lte: 1,
                color: "#660099",
              },
            ],
            outOfRange: {
              color: "#999",
            },
          },
          series: {
            name: "Beijing AQI",
            type: "line",
            data: arr,
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
    back() {
      this.$store.commit("setOver", true);
      this.$store.commit("changeRoadName", "all");
    },
  },
};
</script>

<style scoped>
#detail {
  height: calc(100% - 300px);
  width: 350px;
  position: absolute;
  right: 0px;
  top: 0px;
  transition: all 500ms;
}
#monitors {
  width: 100%;
  height: 64px;
  float: left;
  overflow: scroll;
  overflow-x: hidden;
}
#monitors::-webkit-scrollbar {
  width: 3px;
  height: 1px;
}
#monitors::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #c5c5c5;
}
#monitors::-webkit-scrollbar-track {
  border-radius: 10px;
}
#chart {
  width: 435px;
  height: 300px;
  float: left;
}
#monitors .item {
  height: 25px;
  width: 55px;
  border: 1px solid black;
  border-radius: 10px;
  text-align: center;
  margin-top: 5px;
  cursor: pointer;
  overflow: hidden;
  font-size: 13px;
  line-height: 25px;
  float: left;
}
#monitors .item:hover {
  background: cornflowerblue;
}
#back {
  position: absolute;
  right: 0px;
  width: 30px;
  height: 30px;
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
#back:hover {
  background: yellowgreen;
  color: black;
  width: 32px;
  height: 32px;
}
</style>
