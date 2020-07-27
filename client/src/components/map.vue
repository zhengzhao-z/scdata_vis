<!--
 * @Description: 天地图
 * @version: 0.1
 * @Author: zhengzhao
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
      map: {}
    };
  },
  mounted() {
    this.mapInit();
    this.heatmapInit();
    this.mapOutlineInit();
  },
  methods: {
    mapInit() {
      let map = new T.Map("tmap");
      map.centerAndZoom(new T.LngLat(104.07, 30.67), 7);
      this.map = map;
      this.map.enableScrollWheelZoom();
      this.map.setMinZoom(6);
      this.map.setMaxZoom(12);
      console.log(this.map.getBounds());
    },
    heatmapInit() {
      this.$axios.get("http://localhost:3000/heatmap").then(res => {
        let arr = res.data;
        let points = [];
        for (let i = 0; i < arr.length; i++) {
          points.push({
            lat: arr[i].latitude,
            lng: arr[i].longitude,
            count: 1
          });
        }
        let heatmapOverlay = new T.HeatmapOverlay({
          radius: 15
          //这里改热力图渐变颜色
        });
        this.map.addOverLay(heatmapOverlay);
        heatmapOverlay.setDataSet({ data: points, max: 300 });
      });
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
  height: 100%;
  width: 100%;
}
</style>
