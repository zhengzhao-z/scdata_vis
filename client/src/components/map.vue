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
      heatmapOverlay: null
    };
  },
  mounted() {
    this.getEventData();
    this.mapInit();
    this.mapOutlineInit();
    this.drawMonitor();
  },
  computed: {
    G() {
      if (this.$store.state.eventLieBie) {
        console.log(this.$store.state.eventLieBie);
        if (this.eventData) {
          let leibie = [];
          let dataFilter = this.eventData.filter(item => {
            return this.$store.state.eventLieBie.includes(item.BLOCK_REASON);
          });
          console.log(dataFilter);
          return dataFilter;
        }
      } else {
        return this.eventData;
      }
    }
  },
  watch: {
    G(newValue, oldValue) {
      console.log("重新绘制");
      this.heatmapInit(newValue);
    }
  },
  methods: {
    getEventData() {
      // this.$axios.get("http://localhost:3000/heatmap").then(res => {
      // });
      this.$axios.get("../../static/event.json").then(res => {
        this.eventData = res.data;
      });
    },
    mapInit() {
      let map = new T.Map("tmap");
      map.centerAndZoom(new T.LngLat(99.902684, 30.570922), 7);
      this.map = map;
      this.map.enableScrollWheelZoom();
      this.map.setMinZoom(7);
      this.map.setMaxZoom(10);
    },
    heatmapInit(arr) {
      if (this.heatmapOverlay) {
        this.map.removeOverLay(this.heatmapOverlay);
      }
      this.heatmapOverlay = new T.HeatmapOverlay({
        radius: 10
        //这里改热力图渐变颜色
      });
      let count = 4;
      if (!arr) {
        return;
      }
      if (arr.length < 1000) {
        count = 10;
      }
      let points = [];
      for (let i = 0; i < arr.length; i++) {
        points.push({
          lat: arr[i].latitude,
          lng: arr[i].longitude,
          count: count
        });
      }

      this.map.addOverLay(this.heatmapOverlay);
      this.heatmapOverlay.setDataSet({ data: points, max: 300 });
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
