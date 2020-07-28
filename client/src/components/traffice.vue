<!--
 * @Description: 交通流量、车速、车距
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
--> 
<template>
  <div id="traffic">

  </div>
</template>

<script>
export default {
    name:"traffic",
    data(){
        return {

        }
    },
    mounted(){
        this.$axios.post("http://localhost:3000/traffic",{
            "id":"51000020160416172821205SpZ3O8tEy",
            "date":"2019-06-02 00:00:00"
        }).then(res=>{
            let data = res.data;
            this.process(data);
        });
        let color = d3.scaleLinear()
            .domain([0, 0.5, 1])
            .range(["rgb(207,59,44)","rgb(252,220,33)", "rgb(52,139,68)"])
            .interpolate(d3.interpolateRgb.gamma(0.1));
        this.color = color;
        let scale = d3.scaleLinear()
            .domain([40,100])
            .range([0,1]);
        this.scale = scale;

        let color1 = d3.scaleLinear()
            .domain([0,100])
            .range(["rgb(255,255,255)","rgb(77,73,137)"])
            .interpolate(d3.interpolateRgb);
        this.color1 = color1;
    },
    methods:{
        //数据处理
        process(data){
            let sx = {},
                xx = {};
            data.forEach((d,i)=>{
                let sjxh = parseInt(d.SJXH);
                if(d.XSFX == "S"){
                    // 上行方向
                    if(!sx[sjxh]){
                        sx[sjxh] = {
                            speed:0,
                            speed_counter:0,
                            gcbfb:0,
                            gcbfb_counter:0,
                            jj:0,
                            jj_counter:0,
                            zly:0,
                            zly_counter:0
                        }
                    }
                    let tmp = this.detail(d);
                    sx[sjxh].speed += tmp[0];
                    sx[sjxh].speed_counter += tmp[1];
                     if(d.GCBFB!=="0"){
                        sx[sjxh].gcbfb += parseInt(d.GCBFB);
                        sx[sjxh].gcbfb_counter += 1;
                    }
                    if(d.PJCTJJ!=="0"){
                        sx[sjxh].jj += parseInt(d.PJCTJJ);
                        sx[sjxh].jj_counter += 1;
                    }
                    if(d.SJZYL!=="0"){
                        sx[sjxh].zly += parseInt(d.SJZYL);
                        sx[sjxh].zly_counter += 1;
                    }
                }else{
                    if(!xx[sjxh]){
                        xx[sjxh] = {
                            speed:0,
                            speed_counter:0,
                            gcbfb:0,
                            gcbfb_counter:0,
                            jj:0,
                            jj_counter:0,
                            zly:0,
                            zly_counter:0
                        }
                    }
                    let tmp = this.detail(d);
                    xx[sjxh].speed += tmp[0];
                    xx[sjxh].speed_counter += tmp[1];
                    if(d.GCBFB!=="0"){
                        xx[sjxh].gcbfb += parseInt(d.GCBFB);
                        xx[sjxh].gcbfb_counter += 1;
                    }
                    if(d.PJCTJJ!=="0"){
                        xx[sjxh].jj += parseInt(d.PJCTJJ);
                        xx[sjxh].jj_counter += 1;
                    }
                    if(d.SJZYL!=="0"){
                        xx[sjxh].zly += parseInt(d.SJZYL);
                        xx[sjxh].zly_counter += 1;
                    }
                }
            })
            this.draw(sx,xx);
        },
        // 获取一条数据的具体值
        detail(d){
            let speed=0,
                speed_counter=0;
            if(d.XKCS!=="0"){
                speed+=parseInt(d.XKCS);
                speed_counter+=1;
            }
            if(d.DKCS!=="0"){
                speed+=parseInt(d.DKCS);
                speed_counter+=1;
            }
            if(d.XHCS!=="0"){
                speed+=parseInt(d.XHCS);
                speed_counter+=1;
            }
            if(d.ZHCS!=="0"){
                speed+=parseInt(d.ZHCS);
                speed_counter+=1;
            }
            if(d.DHCS!="0"){
                speed+=parseInt(d.DHCS);
                speed_counter+=1;
            }
            if(d.TDHS!=="0"){
                speed+=parseInt(d.TDHS);
                speed_counter+=1;
            }
            return [speed,speed_counter]
        },
        //绘制
        draw(sx,xx){
            let data = Object.entries(sx);
            let data1 = Object.entries(xx);
            let a = [];
           for(let i=0;i<data.length;i++){
               if(data[i][1].zly_counter){
                   a.push(data[i][1].zly/data[i][1].zly_counter)
               }else{
                   a.push(0)
               }
               
           }
            let arr=[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1]
            
            const svg = d3.select(this.$el)
                .append("svg")
                .attr("style","width:800px;height:400px")
                .attr("wdith",800)
                .attr("height",400);
            //上行速度
            svg.append("g")
                .selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x",(d,i)=>parseInt(i/12)*16)
                .attr("y",(d,i)=>(i%12)*9)
                .attr("width",15)
                .attr("height",8)
                .attr("fill",d=>this.color(this.scale(d[1].speed/d[1].speed_counter)))
                .append("title")
                    .text(d=>d[1].speed/d[1].speed_counter);
            //下行速度
            svg.append("g")
                .attr("transform","translate(400,0)")
                .selectAll("rect")
                .data(data1)
                .enter()
                .append("rect")
                .attr("x",(d,i)=>parseInt(i/12)*16)
                .attr("y",(d,i)=>(i%12)*9)
                .attr("width",15)
                .attr("height",8)
                .attr("fill",d=>this.color(this.scale(d[1].speed/d[1].speed_counter)))
                .append("title")
                    .text(d=>d[1].speed/d[1].speed_counter);
            //上行跟车百分比
            svg.append("g")
                .attr("transform","translate(0,113)")
                .selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x",(d,i)=>parseInt(i/12)*16)
                .attr("y",(d,i)=>(i%12)*9)
                .attr("width",15)
                .attr("height",8)
                .attr("fill",d=>{
                    if(d[1].gcbfb_counter){
                        return this.color1(d[1].gcbfb/d[1].gcbfb_counter)
                    }
                    return this.color1(0)
                })
                .append("title")
                    .text(d=>d[1].gcbfb/d[1].gcbfb_counter);
            //下行跟车百分比
            svg.append("g")
                .attr("transform","translate(400,113)")
                .selectAll("rect")
                .data(data1)
                .enter()
                .append("rect")
                .attr("x",(d,i)=>parseInt(i/12)*16)
                .attr("y",(d,i)=>(i%12)*9)
                .attr("width",15)
                .attr("height",8)
                .attr("fill",d=>{
                    if(d[1].gcbfb_counter){
                        return this.color1(d[1].gcbfb/d[1].gcbfb_counter)
                    }
                    return this.color1(0)
                })
                .append("title")
                    .text(d=>d[1].gcbfb/d[1].gcbfb_counter);

                
        }

    }
}
</script>

<style>
#traffic{
    width: 600px;
}
</style>
