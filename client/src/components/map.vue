<!--
 * @Description: 天地图
 * @version: 0.1
 * @Author: cmj
 * @LastEditor: zhengzhao
-->
<template>
  <div id="tmap"></div>
</template>
<script>
export default {
  name: "tmap",
  data() {
    return {
      map: {},
      eventData: null,
      heatmapOverlay: null,
      riskLineData: null,
      eventFilterData: null,
      maxCount: 0,
      risks: [],
      monitors: [],
    };
  },
  mounted() {
    this.getEventData();
    this.mapInit();
    this.mapOutlineInit();
  },
  computed: {
    riskRoadName() {
      return this.$store.state.roadName;
    },
    heatMap() {
      const eventLieBie = this.$store.state.eventLieBie; //类别
      const roadName = this.$store.state.roadName; //道路
      if (eventLieBie && roadName === "all") {
        let dataFilter;
        let result = [];
        let max = 0;
        if (this.eventData) {
          if (eventLieBie[0] === "全部") {
            dataFilter = this.eventData;
          } else {
            dataFilter = this.eventData.filter((item) => {
              return eventLieBie.includes(item.BLOCK_REASON);
            });
          }
          // console.log(dataFilter)
          return dataFilter;
        }
      } else {
        let dataFilter = this.eventFilterData[roadName];
        if (!dataFilter) {
          return [];
        }
        let result = [];
        let max = 0;
        if (eventLieBie[0] === "全部") {
          for (let key in dataFilter) {
            let singleEvent = dataFilter[key].data;
            result.push(...singleEvent);
            if (max < dataFilter[key].max) {
              max = dataFilter[key].max;
            }
          }
          this.maxCount = max;
        } else {
          for (let i = 0; i < eventLieBie.length; i++) {
            const eventName = eventLieBie[i];
            if (!dataFilter[eventName]) continue;
            const singleEvent = dataFilter[eventName].data;
            result.push(...singleEvent);
            if (max < dataFilter[eventName].max) {
              max = dataFilter[eventName].max;
            }
          }
          this.maxCount = max;
        }
        return result;
      }
    },
    show() {
      return this.$store.state.mapShow;
    },
  },
  watch: {
    heatMap(newValue, oldValue) {
      this.heatmapInit(newValue);
    },
    show(n, o) {
      if (n != 0) {
        this.heatmapOverlay.hide();
      } else {
        this.risks.forEach((d) => {
          this.map.removeOverLay(d);
        });
        this.monitors.forEach(d=>{
          this.map.removeOverLay(d);
        })
        this.heatmapOverlay.show();
      }
      if (n == 1) {
        this.drawRiskLine();
      }
      if(n==2){
        this.drawMonitor();
      }
    },
    riskRoadName() {
      if(this.show==1){
        this.drawRiskLine();
      }
      if(this.show==2){
        this.drawMonitor();
      }

    },
  },
  methods: {
    getEventData(callback) {
      this.$axios.get("../../static/eventAll2.json").then((res) => {
        this.eventData = res.data;
      });
      this.$axios.get("../../static/road_event.json").then((res) => {
        this.eventFilterData = res.data;
      });
      this.$axios.get("../../static/riskRoadData.json").then((res) => {
        this.riskLineData = res.data;
        callback && callback();
      });
    },
    mapInit() {
      let map = new T.Map("tmap");
      map.centerAndZoom(new T.LngLat(103.543148, 29.428819), 7);
      this.map = map;
      this.map.enableScrollWheelZoom();
      this.map.setMinZoom(7);
      this.map.setMaxZoom(10);
    },
    heatmapInit(arr) {
      let count = 4;
      let points = [];
      for (let i = 0; i < arr.length; i++) {
        points.push({
          lat: arr[i].latitude,
          lng: arr[i].longitude,
          count: arr[i].count || count,
        });
      }
      let max = this.maxCount || 262;
      if (!this.heatmapOverlay) {
        //初始化
        this.heatmapOverlay = new T.HeatmapOverlay({
          radius: 10,
        });
        this.map.addOverLay(this.heatmapOverlay);
      }
      //改变数据
      this.heatmapOverlay.setDataSet({ data: points, max });
    },
    mapOutlineInit() {
      this.$axios.get("../../static/四川省轮廓.json").then((res) => {
        let data = res.data;
        let citiesGeoData = data.features;
        for (let i = 0; i < citiesGeoData.length; i++) {
          let city = citiesGeoData[i];
          let cityGeometry = citiesGeoData[i].geometry;
          let cityLines = cityGeometry.coordinates;
          for (let j = 0; j < cityLines.length; j++) {
            let cityLine = cityLines[j][0];
            let newCityLine = [];
            for (let k = 0; k < cityLine.length; k++) {
              newCityLine.push(new T.LngLat(cityLine[k][0], cityLine[k][1]));
            }
            this.drawLine(newCityLine);
          }
        }
      });
    },
    drawLine(LineData) {
      let line = new T.Polyline(LineData, {
        weight: 2,
        opacity: 0.7,
        color: "black",
      }); //path为天地图经纬度数组，第二个参数为配置项
      line.setLineStyle("dashed");
      this.map.addOverLay(line); // 绘制线到地图上
    },
    // 在地图上添加监测点
    // 检查点 与 热力图 应互斥出行
    drawMonitor() {
      let data = this.$store.state.monitors;
      let icon = new T.Icon({
        iconUrl: "../../static/monitor.png",
        iconSize: new T.Point(30, 30),
      });
      this.monitors.forEach(d=>{
        this.map.removeOverLay(d);
      })
      this.risks.forEach(d=>{
        this.map.removeOverLay(d);
      })
      for (let i = 0; i < data.length; i++) {
        if(data[i].ROADCODE!=this.$store.state.roadName){
          continue
        }
        let marker = new T.Marker(
          new T.LngLat(data[i].longitude, data[i].latitude),
          { icon: icon }
        );
        marker.name = data[i].GCZMC;
        marker.id = data[i].GZCBS;
        this.monitors.push(marker);
        this.map.addOverLay(marker);
      }
    },
    changeLoding(flag) {
      this.isLoading = flag;
    },
    drawRiskLine() {
      if (this.riskLineData && this.show == 1) {
        this.risks.forEach((d) => {
          this.map.removeOverLay(d);
        });
        this.monitors.forEach(d=>{
          this.map.removeOverLay(d);
        })
        this.risks = [];
        if (this.$store.state.roadName === "all") {
          for (let i = 0; i < this.riskLineData.length; i++) {
            let singleRiskLine = this.riskLineData[i];
            let singleRiskLineName = Object.keys(singleRiskLine)[0];
            singleRiskLine = Object.values(singleRiskLine)[0];
            if (singleRiskLineName === "G5") {
              for (let item of singleRiskLine) {
                let color = item.lineStyle.normal.color;
                let coords = item.coords;
                let dataArr = [];

                for (let i = 0; i < coords.length; i++) {
                  dataArr.push(new T.LngLat(coords[i][0], coords[i][1]));
                }
                let riskLine = new T.Polyline(dataArr, {
                  weight: 5,
                  opacity: 0.7,
                  color: color,
                });
                this.map.addOverLay(riskLine); // 绘制线到地图上
                this.risks.push(riskLine);
              }
              break;
            }
          }
        } else {
          for (let i = 0; i < this.riskLineData.length; i++) {
            let singleRiskLine = this.riskLineData[i];
            let singleRiskLineName = Object.keys(singleRiskLine)[0];
            singleRiskLine = Object.values(singleRiskLine)[0];
            if (singleRiskLineName === this.$store.state.roadName) {
              for (let item of singleRiskLine) {
                let color = item.lineStyle.normal.color;
                let coords = item.coords;
                let dataArr = [];
                for (let i = 0; i < coords.length; i++) {
                  dataArr.push(new T.LngLat(coords[i][0], coords[i][1]));
                }
                let riskLine = new T.Polyline(dataArr, {
                  weight: 5,
                  opacity: 0.7,
                  color: color,
                });
                this.map.addOverLay(riskLine);
                this.risks.push(riskLine);
              }
            }
          }
        }
      }
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#tmap {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 0;
}
</style>
