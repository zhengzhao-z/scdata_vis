<!--
 * @Description: 
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
--> 
<template>
  <div id="over">
      <div id="control">
          <el-switch
            v-model="value"
            active-text="全部"
            >
          </el-switch>
          <el-switch
            v-model="value"
            active-text="车辆交通事故"
            :active-color="color[0]"
            >
          </el-switch>
          <el-switch
            v-model="value"
            active-text="车流量大"
            :active-color="color[1]"
            >
          </el-switch>
          <el-switch
            v-model="value"
            active-text="降雨（积水）"
            :active-color="color[2]"
            >
          </el-switch>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            value:true,
            color:d3.schemeCategory10,
            road:["G5","G0512","G4215","S40","G93","S1","S4202","G85","G76","S2","G42","G75"], //道路的排列顺序
            order:["车辆交通事故","车流量大","降雨（积水）","降雪（积雪）","雾霾"]  //事件顺序
        }
    },
    mounted(){
        this.$axios.get("../static/road.json").then(res=>{
            this.process(res.data);
        })
    },
    methods:{
        //处理数据 
        process(data){
            let area=[];
            for(let i=0;i<this.road.length;i++){
                let arr=data[this.road[i]];
                let stack=[];
                let last=[];
                for(let i=0;i<this.order.length;i++){
                    stack[i]=arr.map((d,j)=>{
                        if(!d){
                            //该小时无数据
                            return [0,0];
                        }
                        if(i==0){
                            last[j]=d[this.order[i]];
                            return [0,d[this.order[i]]];
                        }else{
                            let tmp =[last[j],last[j]+d[this.order[i]]];
                            last[j]=last[j]+d[this.order[i]];
                            return tmp;
                        }
                    })
                }
                area.push(stack);
            }
            this.draw(area);           
        },
        //绘制
        draw(data){
            let svg=d3.select(this.$el)
                .append("div")
                .attr("id","scrollbar")
                .append("svg")
                .attr("wdith",300)
                .attr("height",1850);  //根据道路数量自动计算
            let scale=d3.scaleLinear()
                .domain([0,161])
                .range([150,0]);
            let area=d3.area()
                .curve(d3.curveCardinal)
                .x((d,i)=>{return i*10+10})
                .y0(d=>scale(d[0]))
                .y1(d=>scale(d[1]));
            for(let i=0;i<data.length;i++){
                let arr=data[i];
                let g=svg.append("g")
                .attr("transform","translate(0,"+i*140+")");
                g.selectAll("path")
                .data(arr)
                .join("path")
                    .attr("d",area)
                    .attr("fill",(d,i)=>{
                        return d3.schemeCategory10[i];
                    });
                g.append("text")
                    .attr("x",10)
                    .attr("y",50)
                    .attr("fill","#409EFF")
                    .text(this.road[i])
                    .style("cursor","pointer");
                g.append("g")
                    .selectAll("text")
                    .data([0,8,16])
                    .enter()
                    .append("text")
                    .attr("x",(d)=>d*10+10)
                    .attr("y",162)
                    .attr("font-size","12")
                    .text(d=>d)
                
                
            }
        },
        //数组求和
        sum(arr){
            let sum=0;
            arr.forEach(d=>{
                sum+=d;
            })
            return sum;
        }
    }

}
</script>

<style>
#over{
    width: 300px;
    height:68%;
    /* border: 1px solid black; */
    position: absolute;
    box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.3) inset,
    0 0.5em 1em rgba(0, 0, 0, 0.1);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
}
#over #control{
    position: absolute;
    right: -90px;
    top: 0px;
}
.el-switch{
    display: block;
    margin-top:5px ;
}
#scrollbar{
    width: 100%;
    height: 100%;
    overflow: scroll;
    overflow-x:hidden;
}
#scrollbar::-webkit-scrollbar{
    width: 3px;
    height: 1px;
}
#scrollbar::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #c5c5c5;
}
#scrollbar::-webkit-scrollbar-track {
    border-radius: 10px;
}
</style>
