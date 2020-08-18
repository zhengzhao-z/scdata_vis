<!--
 * @Description: 交通流量、车速、车距
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
-->
<template>
  <div id="traffic"></div>
</template>

<script>
export default {
    name:"traffic",
    data(){
        return {

        }
    },
    mounted(){
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
        const svg = d3.select(this.$el)
            .append("svg")
            .attr("style","width:350px;height:490px")
            .attr("wdith",350)
            .attr("height",490);
        this.svg = svg;
        this.lengend();

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
        draw(data){
            let sx = data[0];
            let xx = data[1];
            let a = [];   
            let svg = this.svg;
            let gs = svg.append("g")
                .attr("transform","translate(0,15)");
            //上行速度
           gs.append("g")
                .attr("transform","translate(35,0)")
                .selectAll("rect")
                .data(sx)
                .enter()
                .append("rect")
                .attr("x",(d,i)=>parseInt(i/12)*13)
                .attr("y",(d,i)=>(i%12)*9)
                .attr("width",12)
                .attr("height",8)
                .attr("fill",d=>this.color(this.scale(d.speed)))
                .append("title")
                    .text(d=>d.speed);
            //下行速度
            gs.append("g")
                .attr("transform","translate(35,220)")
                .selectAll("rect")
                .data(xx)
                .enter()
                .append("rect")
                .attr("x",(d,i)=>parseInt(i/12)*13)
                .attr("y",(d,i)=>(i%12)*9)
                .attr("width",12)
                .attr("height",8)
                .attr("fill",d=>this.color(this.scale(d.speed)))
                .append("title")
                    .text(d=>d.speed);
            //上行跟车百分比
            gs.append("g")
                .attr("transform","translate(35,110)")
                .selectAll("rect")
                .data(sx)
                .enter()
                .append("rect")
                .attr("x",(d,i)=>parseInt(i/12)*13)
                .attr("y",(d,i)=>(i%12)*9)
                .attr("width",12)
                .attr("height",8)
                .attr("fill",d=>{
                    return this.color1(d.gcbfb)
                })
                .append("title")
                    .text(d=>d.gcbfb);
            //下行跟车百分比
            gs.append("g")
                .attr("transform","translate(35,330)")
                .selectAll("rect")
                .data(xx)
                .enter()
                .append("rect")
                .attr("x",(d,i)=>parseInt(i/12)*13)
                .attr("y",(d,i)=>(i%12)*9)
                .attr("width",12)
                .attr("height",8)
                .attr("fill",d=>{
                    return this.color1(d.gcbfb)
                })
                .append("title")
                    .text(d=>d.gcbfb);
        },
        lengend(){
            let svg = this.svg;
            let g1 = svg.append("g");
            g1.append("text")
                .attr("font-size",12)
                .attr("transform","translate(37,10)")
                .text("0");
            g1.append("text")
                .attr("font-size",12)
                .attr("transform","translate(141,10)")
                .text("8");
            g1.append("text")
                .attr("font-size",12)
                .attr("transform","translate(243,10)")
                .text("16");
            g1.append("text")
                .attr("font-size",12)
                .attr("transform","translate(323,10)")
                .text("(时)");
            let g = svg.append("g")
                .attr("transform","translate(0,15)");
            g.append("text")
                .attr("font-size",12)
                .attr("transform","translate(4,54)")
                .text("上行");
            g.append("text")
                .attr("font-size",12)
                .attr("transform","translate(4,67)")
                .text("速度");
            g.append("text")
                .attr("font-size",12)
                .attr("transform","translate(4,164)")
                .text("上行");
            g.append("text")
                .attr("font-size",12)
                .attr("transform","translate(0,177)")
                .text("跟车比");

            g.append("text")
                .attr("font-size",12)
                .attr("transform","translate(4,279)")
                .text("下行");
            g.append("text")
                .attr("font-size",12)
                .attr("transform","translate(4,292)")
                .text("速度");
            g.append("text")
                .attr("font-size",12)
                .attr("transform","translate(4,389)")
                .text("下行");
            g.append("text")
                .attr("font-size",12)
                .attr("transform","translate(0,402)")
                .text("跟车比");
            
            let speed=[];
            for(let i=0;i<=100;i++){
                speed.push(i);
            }
            g.append("g")
                .selectAll("rect")
                .data(speed)
                .enter()
                .append("rect")
                .attr("x",(d,i)=>{
                    return i*1+35;
                })
                .attr("y",450)
                .attr("width",1)
                .attr("height",10)
                .attr("fill",d=>this.color(d/100));
            g.append("g")
                .selectAll("rect")
                .data(speed)
                .enter()
                .append("rect")
                .attr("x",(d,i)=>{
                    return i*1+200;
                })
                .attr("y",450)
                .attr("width",1)
                .attr("height",10)
                .attr("fill",d=>this.color1(d));
            g.append("text")
                .attr("x",20)
                .attr("y",471)
                .attr("font-size",12)
                .text("40km/h");
            g.append("text")
                .attr("x",115)
                .attr("y",471)
                .attr("font-size",12)
                .text("100km/h");
            g.append("text")
                .attr("x",195)
                .attr("y",471)
                .attr("font-size",12)
                .text("0%");
            g.append("text")
                .attr("x",285)
                .attr("y",471)
                .attr("font-size",12)
                .text("100%")
        }
    },
    computed:{
        traffic(){
            return this.$store.state.traffic;
        }
    },
    watch:{
        traffic(n,o){
            this.draw(n);
        }
    }
}
</script>

<style>
#traffic{
    width: 350px;
    /* border: 1px solid black; */
}
</style>
