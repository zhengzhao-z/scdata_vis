<!--
 * @Description: 某条道路的详细情况
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
-->
<template>
  <div id="detail" class="bg">
    <!-- <div id="back" @click="back">></div> -->
    <div class="title">G5道路监测站 日期: {{date}}</div>
    <div id="monitors">
      <div v-for="(item,i) in monitors" v-bind:key="i" @click="change(item,i)" :class="{'choose':choose==i,'item':true}">
        <span>{{ item.GCZMC }}</span>
      </div>
    </div>
    <traffic></traffic>
    <div id="jam" ref="jam"></div>
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
      gcz: "51000020160504B7B7DE9BC2D5680D2C",
      choose:0
    };
  },
  mounted() {
    //观测站默认为G5道路
    //默认观测站
    const svg = d3
      .select(this.$refs.jam)
      .append("svg")
      .attr("width", "100%")
      .attr("height", 220);
    this.svg = svg;
  },
  computed: {
    road() {
      return this.$store.state.roadName;
    },
    date() {
      return this.$store.state.selectDate;
    },
    arr() {
      return this.$store.state.monitors;
    },
    traffic() {
      return this.$store.state.traffic;
    },
  },
  watch: {
    road(n, o) {
      if (n == "all") {
        return;
      } else {
        let arr = this.$store.state.monitors;
        let monitors = [];
        arr.forEach((d) => {
          if (d.ROADCODE == n) {
            monitors.push(d);
          }
        });
        if (monitors.length != 0) {
          this.monitors = monitors;
          this.choose=0;
          //默认显示第一个监测站数据
          this.$axios
            .post("http://localhost:3000/traffic", {
              id: this.monitors[0].GCZBS,
              date: "2019-04-30 00:00:00",
            })
            .then((res) => {
              // this.chartInit(res.data[0]);
            });
        } else {
          this.$notify.info({
            title: "提示",
            message:
              "因数据原因，目前观测站详细信息仅支持G5 G76 G65！后续可陆续添加数据以支持所有道路。",
            duration: 3000,
          });
        }
      }
    },
    date(n, o) {
      //日期改变时 刷新像素矩阵 拥堵曲线
      this.$axios
        .post("http://localhost:3000/traffic", {
          id: this.gcz,
          date: this.dateTran(n) + " 00:00:00",
        })
        .then((res) => {
          console.log(res.data);
          this.$store.commit("setTraffic", res.data);
        });
    },
    arr(n, o) {
      n.forEach((d) => {
        if (d.ROADCODE == "G5") {
          this.monitors.push(d);
        }
      });
      this.monitors[0].choose=true;
    },
    traffic(n, o) {
      this.jamChart(n);
    },
  },
  methods: {
    change(e,index) {
      this.choose=index;
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
      console.text;
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
      const chartDom = this.$refs.jam;
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
          // dataZoom: [
          //   {
          //     startValue: "2014-06-01",
          //   },
          //   {
          //     type: "inside",
          //   },
          // ],
          visualMap: {
            top: 10,
            right: 10,
            pieces: [
              {
                gt: 0,
                lte: 0.2,
                color: "#096",
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
          },
        })
      );
    },
    back() {
      this.$store.commit("changeRoadName", "all");
    },
    //拥堵曲线绘制
    jamChart(data) {
      let line1 = [],
        line2 = [];
      let max=0.5;
      data[0].forEach((d, i) => {
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
        line1[i] = jj * gcbfb * speed * zyl;
        if(max<line1[i]){
          max = line1[i];
        }
      });
      data[1].forEach((d, i) => {
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
        line2[i] = jj * gcbfb * speed * zyl;
        if(max<line2[i]){
          max = line2[i];
        }
      });
      console.log(line1, line2);
      let svg = this.svg;
      svg.selectAll("g").remove();
      let scale = d3.scaleLinear()
        .domain([0,287])
        .range([35,340]);
      let scaley = d3.scaleLinear()
        .domain([0,max])
        .range([200,10]);
      let line = d3.line()
        .x((d,i)=>scale(i))
        .y(d=>scaley(d));
      svg.append("g")
        .append("path")
        .attr("d",line(line1))
        .attr("stroke","#0396FF")
        .attr("stroke-width",0.02)
    },
    dateTran(str) {
      let arr = str.split("/");
      if (arr[1].length == 1) {
        arr[1] = "0" + arr[1];
      }
      if (arr[2].length == 1) {
        arr[2] = "0" + arr[2];
      }
      return arr[0] + "-" + arr[1] + "-" + arr[2];
    },
  },
};
</script>

<style scoped>
#detail {
  height: calc(100% - 280px);
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
  margin-bottom: 5px;
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
#jam {
  width: 100%;
  height: 200px;
  float: left;
}
#monitors .item {
  height: 25px;
  width: 55px;
  /* border: 1px solid black; */
  margin-left:2px ;
  border-radius: 10px;
  text-align: center;
  margin-top: 5px;
  cursor: pointer;
  overflow: hidden;
  font-size: 13px;
  line-height: 25px;
  float: left;
  background:#ABDCFF;
}
#monitors .item:hover {
  background: cornflowerblue;
}
.choose{
  background: tomato !important;
}
</style>
