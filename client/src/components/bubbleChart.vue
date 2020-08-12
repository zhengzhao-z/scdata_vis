<!--
 * @Description: 
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
-->
<template>
  <div class="bubbleChart" ref="bubbleChart"></div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      road: ["G5", "G42", "G76", "G85", "G93", "G0512", "G4215"]
    };
  },
  mounted() {
    this.getData(this.initChart);
  },
  methods: {
    getData(callback) {
      this.$axios.get("../static/speedPercent.json").then(res => {
        this.data = res.data.data;
        callback && callback();
      });
    },
    initChart() {
      const chart = this.$echarts.init(this.$refs.bubbleChart);
      console.log(this.data);
      const option = {
        title: {
          text: "道路速度特征",
          right: "-5",
          top: "20",
          textStyle: {
            fontSize: "15"
          }
        },
        legend: {
          orient: "vertical",
          right: "0",
          top: "26%",
          data: [
            "speed0_60",
            "speed61_80",
            "speed81_100",
            "speed101_120",
            "speed121"
          ],
          formatter: function(name) {
            switch (name) {
              case "speed0_60":
                return "60-";
              case "speed61_80":
                return "61-80";
              case "speed81_100":
                return "81-100";
              case "speed101_120":
                return "101-120";
              case "speed121":
                return "120+";
            }
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function(paramsObj) {
            const str = `${paramsObj.name}</br> ${paramsObj.marker} percent: ${paramsObj.percent}%`;
            return str;
          }
        },
        color: [
          "rgb(207,59,44)",
          "rgb(252,220,33)",
          "#348b7b",
          "#758b34",
          "rgb(52,139,68)"
        ],
        series: [
          {
            name: "访问来源",
            type: "pie",
            top: -880,
            left: -80,
            radius: [30, 50],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },

            emphasis: {
              label: {
                show: true,
                // fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: this.data.G5
          },
          {
            name: "访问来源",
            type: "pie",
            top: -660,
            left: -80,
            radius: [30, 50],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },

            emphasis: {
              label: {
                show: true,
                // fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: this.data.G42
          },
          {
            name: "访问来源",
            type: "pie",
            top: -430,
            left: -80,
            radius: [30, 50],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },

            emphasis: {
              label: {
                show: true,
                // fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: this.data.G76
          },
          {
            name: "访问来源",
            type: "pie",
            top: -215,
            left: -80,
            radius: [30, 50],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },

            emphasis: {
              label: {
                show: true,
                // fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: this.data.G85
          },
          {
            name: "访问来源",
            type: "pie",
            top: 0,
            left: -80,
            radius: [30, 50],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },

            emphasis: {
              label: {
                show: true,
                // fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: this.data.G93
          },
          {
            name: "访问来源",
            type: "pie",
            top: 230,
            left: -80,
            radius: [30, 50],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },

            emphasis: {
              label: {
                show: true,
                // fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: this.data.G0512
          },
          {
            name: "访问来源",
            type: "pie",
            top: 460,
            left: -80,
            radius: [30, 50],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },

            emphasis: {
              label: {
                show: true,
                // fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: this.data.G4215
          }
        ]
      };
      chart.setOption(option);
    }
  }
};
</script>

<style scoped>
.bubbleChart {
  width: 200px;
  height: 994px;
  display: flex;
}
.bubbleChart > div {
  width: 200px;
}
</style>
