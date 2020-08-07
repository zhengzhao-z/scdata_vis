<!--
 * @Description: 
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
-->
<template>
  <div
    ref="calendar"
    id="calendar"
    :style="{ width: '600px', height: '248px' }"
  ></div>
</template>

<script>
export default {
  data() {
    return {
      calendarData: [],
      chart: null
    };
  },
  mounted() {
    this.getData();
    this.chartInit();
  },
  watch: {
    calendarData: {
      handler(newdata, olddata) {
        this.chartInit();
      },
      deep: true
    }
  },
  methods: {
    processData(data) {
      for (let i = 0; i < data.length; i++) {
        let obj = {
          value: [data[i].time, data[i].count],
          itemStyle: {}
        };
        this.calendarData.push(obj);
      }
    },
    getData() {
      this.$axios.get("../../static/calendarAll.json").then(res => {
        this.processData(res.data);
      });
    },
    getOptions() {
      return {
        title: {
          top: 10,
          left: 30,
          text: "2019交通阻断事件日历图"
        },
        tooltip: {
          position: "top"
        },
        visualMap: {
          show: true,
          min: 0,
          max: 1400,
          calculable: true,
          orient: "horizontal",
          top: "3%",
          left: "50%"
        },
        calendar: [
          {
            top: "30%",
            left: "8%",
            range: ["2019-01-01", "2019-06-30"],
            orient: "horizontal",
            yearLabel: {
              show: false
            },
            dayLabel: {
              nameMap: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
            },
            monthLabel: {
              nameMap: "cn"
            }
          }
        ],
        series: [
          {
            type: "heatmap",
            coordinateSystem: "calendar",
            data: this.calendarData,
            calendarIndex: 0,
            dataIndex: 150,
            emphasis: {
              itemStyle: {
                borderColor: "#000"
              }
            }
          }
        ]
      };
    },
    chartInit() {
      if (this.calendarData.length === 0) {
        return;
      }
      if (this.chart) {
        this.chart.dispose();
      }
      const chartDom = this.$refs.calendar;
      this.chart = this.$echarts.init(chartDom);
      let options = this.getOptions();
      this.chart.setOption(options);
      this.chart.on("click", params => {
        options.series[0].data.forEach((data, index) => {
          if (index === params.dataIndex) {
            if (!data.isChecked) {
              data.itemStyle.borderColor = "red";
            }
          } else {
            data.itemStyle.borderColor = "none";
          }
        });
        this.chart.setOption(options);
      });
    }
  }
};
</script>

<style scoped>
#calendar {
  box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.3) inset,
    0 0.5em 1em rgba(0, 0, 0, 0.1);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
</style>
