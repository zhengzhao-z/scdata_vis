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
const {G5zd,G65zd,G76zd,Monitor,Monitors} =  require('./db.js');


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
app.post("/traffic",(req,res)=>{
    let id = req.body.id,
        date = req.body.date;
    Monitors.get(id).find({"GCRQ":date},{"UPDATE_TIME":0,"_id":0,"GCRQ":0,"CLZQ":0},(err,clo)=>{
        res.send(clo);
    })
})

// 监测站坐标
app.get("/monitor",(req,res)=>{
    Monitor.find({},{"_id":0,"latitude":1,"longitude":1,"GZCMC":1,"GZCBS":1},(err,clo)=>{
        res.send(clo);
    })
})

/* 3000端口监听 */
app.listen(3000,()=>{
    console.log('http://localhost:3000');
});
