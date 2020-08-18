/*
 * @Description: 
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
 */ 
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//允许跨域设置
app.all('*', (req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*"); //端口号应该为你客户端的端口号
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.sendStatus(200);
    else next();
});
const {zd,G5zd,G65zd,G76zd,Monitor,Monitors} =  require('./db.js');


app.get("/a",(req,res)=>{
    G5zd.findOne({},function(err,clo){
        res.send(clo)
    })
})

// 获取热力图相关值
app.get("/heatmap",(req,res)=>{
    G5zd.find({},{"_id": 0, "latitude": 1 ,"longitude":1},(err,clo)=>{
        res.send(clo);
    })
})

// 获取流量数据
//拥堵 和 像素矩阵
app.post("/traffic", (req, res) => {
    let id = req.body.id,
        date = req.body.date;
    Monitors.get(id).find({ "GCRQ": date }, { "UPDATE_TIME": 0, "_id": 0, "GCRQ": 0, "CLZQ": 0 },{lean: true}, (err, clo) => {
        let sx = [],
            xx = [];
        clo.forEach(d => {
            let sjxh = parseInt(d.SJXH)-1;
            if (d.XSFX == "S") {
                // 上行方向
                if (!sx[sjxh]) {
                    sx[sjxh] = {
                        speed: 0,
                        speed_counter: 0,
                        gcbfb: 0,
                        gcbfb_counter: 0,
                        jj: 0,
                        jj_counter: 0,
                        zyl: 0,
                        zyl_counter: 0
                    }
                }
                let tmp = detail(d);
                sx[sjxh].speed += tmp[0];
                sx[sjxh].speed_counter += tmp[1];
                if (d.GCBFB !== "0") {
                    sx[sjxh].gcbfb += parseInt(d.GCBFB);
                    sx[sjxh].gcbfb_counter += 1;
                }
                if (d.PJCTJJ !== "0") {
                    sx[sjxh].jj += parseInt(d.PJCTJJ);
                    sx[sjxh].jj_counter += 1;
                }
                if (d.SJZYL !== "0") {
                    sx[sjxh].zyl += parseInt(d.SJZYL);
                    sx[sjxh].zyl_counter += 1;
                }
            } else {
                if (!xx[sjxh]) {
                    xx[sjxh] = {
                        speed: 0,
                        speed_counter: 0,
                        gcbfb: 0,
                        gcbfb_counter: 0,
                        jj: 0,
                        jj_counter: 0,
                        zyl: 0,
                        zyl_counter: 0
                    }
                }
                let tmp = detail(d);
                xx[sjxh].speed += tmp[0];
                xx[sjxh].speed_counter += tmp[1];
                if (d.GCBFB !== "0") {
                    xx[sjxh].gcbfb += parseInt(d.GCBFB);
                    xx[sjxh].gcbfb_counter += 1;
                }
                if (d.PJCTJJ !== "0") {
                    xx[sjxh].jj += parseInt(d.PJCTJJ);
                    xx[sjxh].jj_counter += 1;
                }
                if (d.SJZYL !== "0") {
                    xx[sjxh].zyl += parseInt(d.SJZYL);
                    xx[sjxh].zyl_counter += 1;
                }
            }
        });
        let s=sx.map(d=>{
            let t={};
            if(d.speed_counter==0){
                t.speed=0;
            }else{
                t.speed=d.speed/d.speed_counter;
            }
            if(d.gcbfb_counter==0){
                t.gcbfb=0;
            }else{
                t.gcbfb=d.gcbfb/d.gcbfb_counter;
            }
            if(d.zyl_counter==0){
                t.zyl=0;
            }else{
                t.zyl=d.zyl/d.zyl_counter;
            }
            if(d.jj_counter==0){
                t.jj=0;
            }else{
                t.jj=d.jj/d.jj_counter;
            }
            return t;
        });
        let x=xx.map(d=>{
            let t={};
            if(d.speed_counter==0){
                t.speed=0;
            }else{
                t.speed=d.speed/d.speed_counter;
            }
            if(d.gcbfb_counter==0){
                t.gcbfb=0;
            }else{
                t.gcbfb=d.gcbfb/d.gcbfb_counter;
            }
            if(d.zyl_counter==0){
                t.zyl=0;
            }else{
                t.zyl=d.zyl/d.zyl_counter;
            }
            if(d.jj_counter==0){
                t.jj=0;
            }else{
                t.jj=d.jj/d.jj_counter;
            }
            return t;
        })
        res.send([s,x]);
    })
})

// risk
app.post("/risk",(req,res)=>{
    let road = req.body.road;
    zd.find({"ROAD_ID":road,"BLOCK_REASON":"车辆交通事故","START_STAKE":{$ne:"0",$ne:"0,0"}},{"_id":0,"START_STAKE":1},(err,clo)=>{
        res.send(clo);
    })
})

// 监测站坐标
app.get("/monitor",(req,res)=>{
    Monitor.find({},{"_id":0,"latitude":1,"longitude":1,"GCZMC":1,"GCZBS":1,"ROADCODE":1},(err,clo)=>{
        res.send(clo);
    })
})

//某条路的详细信息
app.post("/detail",(req,res)=>{
    let road = req.body.road;
    zd.find({"ROAD_ID":road},{"_id":0,"START_STAKE":1,"BLOCK_REASON":1,"MEASURES_NAME":1},(err,clo)=>{
        res.send(clo);
    })
})

/* 3000端口监听 */
app.listen(3000,()=>{
    console.log('http://localhost:3000');
});


//函数
function detail(d){
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
}
