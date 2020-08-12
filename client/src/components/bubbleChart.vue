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
        legend: {
          orient: "vertical",
          right: "0",
          top: "30%",
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
                return 60;
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
        color: ["#e575bc", "#5eb1e9", "#94f3f7", "#fdef7b", "#f4b191"],
        series: [
          {
            name: "访问来源",
            type: "pie",
            top: -850,
            left: -80,
            radius: [40, 60],
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
            top: -580,
            left: -80,
            radius: [40, 60],
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
            top: -300,
            left: -80,
            radius: [40, 60],
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
            top: 0,
            left: -80,
            radius: [40, 60],
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
            top: 280,
            left: -80,
            radius: [40, 60],
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
            top: 550,
            left: -80,
            radius: [40, 60],
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
            top: 850,
            left: -80,
            radius: [40, 60],
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
  width: 223px;
  height: 994px;
  display: flex;
}
.bubbleChart > div {
  width: 223px;
}
</style>
