<!--
 * @Description: 天地图
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
--> 
<template>
  <div id="tmap">

  </div>
</template>
<script>

export default {
    name:'tmap',
    data(){
        return{

        }
    },
    mounted(){
        let map = new T.Map('tmap');
        map.centerAndZoom(new T.LngLat(104.07, 30.67), 9);
        this.map = map;
        this.$axios.get("http://localhost:3000/heatmap").then(res=>{
            let arr = res.data;
            let points=[];
            for(let i=0;i<arr.length;i++){
                points.push({lat:arr[i].latitude,lng:arr[i].longitude,count:1})
            }
            let heatmapOverlay = new T.HeatmapOverlay({
                "radius": 20
                //这里改热力图渐变颜色
            });
            this.map.addOverLay(heatmapOverlay);
            heatmapOverlay.setDataSet({data: points, max: 300});
        })
    }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
}
#tmap{
    height: 900px;
    width: 1900px;
}
</style>