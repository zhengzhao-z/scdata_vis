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
    :style="{ width: '700px', height: '200px' }"
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
    getData() {
      this.$axios.get("../../static/calendarAll.json").then(res => {
        let data = res.data;
        for (let i = 0; i < data.length; i++) {
          this.calendarData.push([data[i].time, data[i].count]);
        }
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
          top: "5%",
          left: "60%"
        },
        calendar: [
          {
            top: "25%",
            left: "5%",
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
            calendarIndex: 0
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
      this.chart.setOption(this.getOptions());
    }
  }
};
</script>

<style scoped></style>
