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
      riskLineOverlay: null
    };
  },
  mounted() {
    this.getEventData();
    this.mapInit();
    this.mapOutlineInit();
    this.drawMonitor();
  },
  computed: {
    riskRoadName() {
      return this.$store.state.roadName;
    },
    heatMap() {
      const eventLieBie = this.$store.state.eventLieBie;
      const roadName = this.$store.state.roadName;
      // console.log(eventLieBie);
      // console.log(roadName);

      if (eventLieBie && roadName === "all") {
        let dataFilter;
        let result = [];
        let max = 0;
        if (this.eventData) {
          if (eventLieBie[0] === "全部") {
            // let testData = this.eventFilterData;
            // for (const key in testData) {
            //   const road = testData[key];
            //   for (const subKey in road) {
            //     const event = road[subKey];
            //     result.push(...event.data);
            //     if (max < event.max) {
            //       max = event.max;
            //     }
            //   }
            // }
            // this.maxCount = max;
            dataFilter = this.eventData;
          } else {
            dataFilter = this.eventData.filter(item => {
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
    riskIsShow() {
      return this.$store.state.riskIsShow;
    }
  },
  watch: {
    heatMap(newValue, oldValue) {
      console.log("重新绘制");
      this.heatmapInit(newValue);
    },
    riskIsShow(newValue, oldValue) {
      if (newValue) {
        console.log(newValue);
        this.drawRiskLine();
      } else {
        this.heatmapInit(this.eventData);
      }
    },
    riskRoadName() {
      this.drawRiskLine();
    }
  },
  methods: {
    getEventData(callback) {
      // this.$axios.get("http://localhost:3000/heatmap").then(res => {
      // });
      this.$axios.get("../../static/eventAll2.json").then(res => {
        this.eventData = res.data;
      });
      this.$axios.get("../../static/road_event.json").then(res => {
        this.eventFilterData = res.data;
      });
      this.$axios.get("../../static/riskRoadData.json").then(res => {
        // console.log(res.data)
        this.riskLineData = res.data;
        callback && callback();
      });
    },
    mapInit() {
      let map = new T.Map("tmap");
      map.centerAndZoom(new T.LngLat(104.563148, 29.428819), 7);
      this.map = map;
      this.map.enableScrollWheelZoom();
      this.map.setMinZoom(6);
      this.map.setMaxZoom(10);
    },
    heatmapInit(arr) {
      if (!this.riskIsShow) {
        this.map.clearOverLays();
        if (this.heatmapOverlay) {
          this.map.removeOverLay(this.heatmapOverlay);
        }
        this.heatmapOverlay = new T.HeatmapOverlay({
          radius: 10
          // gradient: {
          //   0.2: "blue",
          //   0.5: "#f0fb5a",
          //   0.8: "#eb3323"
          // }
          //这里改热力图渐变颜色
        });
        let count = 4;
        if (!arr) {
          return;
        }
        if (arr.length < 2000) {
          console.log(arr.length);
          count = 20;
        } else if (arr.length < 1000) {
          console.log(arr.length);
          count = 40;
        } else if (arr.length < 500) {
          console.log(arr.length);
          count = 50;
        } else if (arr.length < 100) {
          console.log(arr.length);
          count = 60;
        }
        let points = [];
        for (let i = 0; i < arr.length; i++) {
          points.push({
            lat: arr[i].latitude,
            lng: arr[i].longitude,
            count: arr[i].count || count
          });
        }
        let max = this.maxCount || 262;
        this.map.addOverLay(this.heatmapOverlay);
        this.heatmapOverlay.setDataSet({ data: points, max });
      }
    },
    mapOutlineInit() {
      this.$axios.get("../../static/四川省轮廓.json").then(res => {
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
        color: "black"
      }); //path为天地图经纬度数组，第二个参数为配置项
      line.setLineStyle("dashed");
      this.map.addOverLay(line); // 绘制线到地图上
    },
    // 在地图上添加监测点
    // 检查点 与 热力图 应互斥出行
    drawMonitor() {
      this.$axios.get("http://localhost:3000/monitor").then(res => {
        let data = res.data;
        let icon = new T.Icon({
          iconUrl: "../../static/monitor.png",
          iconSize: new T.Point(30, 30)
        });
        for (let i = 0; i < res.data.length; i++) {
          let marker = new T.Marker(
            new T.LngLat(res.data[i].longitude, res.data[i].latitude),
            { icon: icon }
          );
          marker.name = res.data[i].GCZMC;
          marker.id = res.data[i].GZCBS;
          marker.addEventListener("click", e => {
            //点击事件 todo
            // 放大 中心
            this.map.centerAndZoom(
              new T.LngLat(e.lnglat.lng, e.lnglat.lat),
              15
            );
            //显示traffic
          });
          this.map.addOverLay(marker);
        }
      });
    },
    changeLoding(flag) {
      this.isLoading = flag;
    },
    drawRiskLine() {
      this.$message("正在请求数据");

      if (this.riskIsShow && this.riskLineData) {
        this.map.clearOverLays();
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
                  color: color
                });
                this.map.addOverLay(riskLine); // 绘制线到地图上
                console.log("绘制了");
              }
              break
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
                  color: color
                });
                this.map.addOverLay(riskLine); // 绘制线到地图上
              }
            }
          }
        }
      }
    }
  }
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
