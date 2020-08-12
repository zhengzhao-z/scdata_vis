<!--
 * @Description: 
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
-->
<template>
  <div id="area">
    <div ref="charts" class="charts"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      road: [
        "G5",
        "G42",
        "G76",
        "G85",
        "G93",
        "G0512",
        "G4215",
        "S40",
        "S1",
        "S4202",
        "S2",
        "G75",
      ], //道路的排列顺序
      color1: {
        "车辆交通事故": "#123597",
        "车流量大": "#49C628",
        "降雨（积水）": "#F8D800",
        "降雪（积雪）": "#9F44D3",
        "雾霾": "#F6416C",
        "all": "#0396FF",
      }, //事件顺序
      match: {
        vehicleAccident: "车辆交通事故",
        traffic: "车流量大",
        rainfall: "降雨（积水）",
        snowfall: "降雪（积雪）",
        smog: "雾霾",
      },
      order: [] //事件
    };
  },
  computed: {
    event() {
      return this.$store.state.eventArea;
    },
  },
  watch: {
    event: {
      handler(newdata, olddata) {
        //order
        if(newdata.length==1 & newdata[0]=="all"){
          this.order=[]
        }else{
          this.order=newdata.map(d=>{
            return this.match[d];
          })
        }
        this.process(this.data);
      },
      deep: true,
    },
  },
  mounted() {
    let svg = d3
      .select(this.$refs.charts)
      .append("svg")
      .attr("width", "100%")
      .attr("height", 12 * 142); //根据道路数量自动计算
    this.svg=svg;
    this.$axios.get("../static/road.json").then((res) => {
      this.process(res.data);
      this.data=res.data;
    });
  },
  methods: {
    //处理数据
    process(data) {
      let area = [];
      let max=0;
      for (let i = 0; i < this.road.length; i++) {
        let arr = data[this.road[i]];
        let stack = [];
        let last = [];
        if (this.order.length == 0) {
          //全部
          stack[0] = arr.map((d, j) => {
            if (!d) {
              //该小时无数据
              return [0, 0];
            }
            let t = this.sum(Object.values(d))
            if(t>max){
              max=t;
            }
            return [0, t];
          });
          stack[0].key="all"
        } else {
          for (let i = 0; i < this.order.length; i++) {
            stack[i]= arr.map((d, j) => {
              if (!d) {
                //该小时无数据
                return [0, 0];
              }
              if (i == 0) {
                last[j] = d[this.order[i]];
                return [0, d[this.order[i]]];
              } else {
                let tmp = [last[j], last[j] + d[this.order[i]]];
                last[j] = last[j] + d[this.order[i]];
                return tmp;
              }
            });
            stack[i].key=this.order[i];
          }
          for(let j=0;j<last.length;j++){
            if(max<last[j]){
              max=last[j];
            }
          }
        }
        area.push(stack);
      }
      this.draw(area,max);
    },
    //绘制
    draw(data,max) {
      let svg = this.svg;
      svg.selectAll("g").remove();
      let scale = d3.scaleLinear().domain([0, max]).range([105, 0]); //算最大值
      let area = d3
        .area()
        .curve(d3.curveCardinal)
        .x((d, i) => {
          return i * 9 + 10;
        })
        .y0((d) =>scale(d[0]))
        .y1((d) => scale(d[1]));
      for (let i = 0; i < data.length; i++) {
        let arr = data[i];
        let g = svg
          .append("g")
          .attr("transform", "translate(0," + i * 110 + ")");
        g.selectAll("path")
          .data(arr)
          .join("path")
          .attr("fill", ({key}) => {
            return this.color1[key]
          })
          .attr("d", area);
        // continue
        g.append("text")
          .attr("x", 20)
          .attr("y", 30)
          .attr("fill", "#409EFF")
          .text(this.road[i])
          .on("click", (d) => {
            //todo 
            this.$store.commit("setOver", false);
            this.$store.commit("changeRoadName", this.road[i]);
            //todo 判断选择的路 刷新detail 
            //请求 监测站列表
            //sankey
            
          })
          .style("cursor", "pointer");
        g.append("g")
          .selectAll("text")
          .data([0, 8, 16])
          .enter()
          .append("text")
          .attr("x", (d) => d * 9 + 10)
          .attr("y", 116)
          .attr("font-size", "12")
          .text((d) => d);
        g.append("text")
          .attr("x",215)
          .attr("y",116)
          .attr("font-size", "12")
          .text("(时)");
        g.append("text")
          .attr("font-size", "11")
          .attr("x",210)
          .attr("y",scale(parseInt(max))+25)
          .text("Max："+parseInt(max));
        g.append("line")
          .attr("x1",10)
          .attr("x2",217)
          .attr("y1",105)
          .attr("y2",105)
          .attr("stroke","#aaa")
          .attr("stroke-width",0.5)
      }
    },
    //数组求和
    sum(arr) {
      let sum = 0;
      arr.forEach((d) => {
        sum += d;
      });
      return sum;
    },
  },
};
</script>

<style>
#area {
  width: 100%;
}
#area #control {
  position: absolute;
  right: 0px;
  top: 30px;
}
</style>
