<!--
 * @Description: 道路事故多发路段危险分级
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
-->
<template>
  <div id="risk-container" class="bg">
    <canvas id="risk" ref="risk" width="800" height="300"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    let canvas = this.$refs.risk;
    let ctx = canvas.getContext("2d");
    this.ctx = ctx;
  },
  computed:{
    risk(){
      return this.$store.state.risk;
    }
  },
  methods:{
    drawRisk(arr){
      let data={};
      arr.forEach(obj=>{
        let d = obj.START_STAKE;
        let stake = parseInt(parseInt(d.replace(/,/g,""))/100);
        for(let i=stake-60;i<=stake+60;i++){
          if(data[i]){
              data[i]+=this.guass(i,stake);
          }else{
              data[i]=this.guass(i,stake);
          }
        }
      });
      let scale = d3.scaleLinear()
        .domain([14640,25004])
        .range([0,800]);
      let scale1 = d3.scaleLinear()
        .domain([0,30])
        .range([50,200]);
      let ctx = this.ctx;
      ctx.clearRect(0,0,800,300);
      ctx.beginPath();
      // ctx.moveTo(0,0);
      for(let i=14640;i<=25004;i++){
          if(data[i]){
              ctx.lineTo(scale(i),250-scale1(data[i]));
          }else{
              ctx.lineTo(scale(i),200);
          }
      }

      ctx.strokeStyle="#409EFF"
      ctx.lineWidth =2;
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      for(let i=14640;i<=25004;i++){
          if(data[i]){
              ctx.lineTo(scale1(data[i]),scale(i));
          }else{
              ctx.lineTo(50,scale(i));
          }
      }

    },
    guass(x,x0){
      return  3/30*Math.pow(Math.E,(x-x0)**2/(-2*30**2))*10;
    }
  },
  watch:{
    risk(n,o){
      this.drawRisk(n);
    }
  }
};
</script>

<style scoped>
#risk {
  width: 800px;
  height: 300px;
}
#risk-container{
  position: absolute;
  left: 500px;
  bottom: 0px;
}
</style>