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
    :style="{ width: '500px', height: '200px' }"
  ></div>
</template>

<script>
export default {
  data() {
    return {
      chart: null,
      min: 0,
      max: 0
    };
  },
  mounted() {
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
  computed: {
    calendarData() {
      const calendarData = this.processCalendarData(
        this.$store.state.calendarData.data
      );
      return calendarData;
    }
  },
  methods: {
    processCalendarData(data) {
      let calendarData = [];
      let min = 9999999;
      let max = -1;
      for (let i = 0; i < data.length; i++) {
        const count = parseInt(data[i].count);
        if (min > count) {
          min = count;
        }
        if (max < count) {
          max = count;
        }
        let obj = {
          value: [data[i].time, count],
          itemStyle: {}
        };

        calendarData.push(obj);
        // this.calendarData.push(obj);
      }
      this.min = min;
      this.max = max;
      return calendarData;
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
          min: this.min,
          max: this.max,
          calculable: true,
          orient: "horizontal",
          top: "2%",
          left: "55%",
          inRange: {
            color: this.$store.state.calendarData.color
          }
        },
        calendar: [
          {
            top: "30%",
            left: "7%",
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
            },
            cellSize: [16, 18]
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
