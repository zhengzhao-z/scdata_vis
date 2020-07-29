<template>
  <div
    ref="calendar"
    id="calendar"
    :style="{ width: '700px', height: '300px' }"
  ></div>
</template>

<script>
export default {
  data() {
    return {
      calendarData: []
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
    chartInit() {
      if (this.calendarData.length === 0) {
        return;
      }
      const chartDom = this.$refs.calendar;
      const chart = this.$echarts.init(chartDom);
      chart.setOption({
        title: {
          top: 30,
          left: "center",
          text: "2019上半年交通阻断事件"
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
          top: "20%",
          left: "60%"
        },
        calendar: [
          {
            top: "40%",
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
      });
    }
  }
};
</script>

<style scoped></style>
