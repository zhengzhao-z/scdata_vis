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
const {G5zd} =  require('./db.js');


app.get("/a",(req,res)=>{
    G5zd.findOne({},function(err,clo){
        console.log(clo)
        res.send(clo)
    })
})

/* 3000端口监听 */
app.listen(3000,()=>{
    console.log('http://localhost:3000');
});
