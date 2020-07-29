/*
 * @Description: 数据库连接
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
 */ 

const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://zz:123456zr@121.89.218.162/scdata?authSource=scdata',{ useNewUrlParser: true,useUnifiedTopology: true })


const G5zd = mongoose.model('G5zd',new mongoose.Schema(),'G5zd');
const G65zd = mongoose.model('G65zd',new mongoose.Schema(),'G65zd');
const G76zd = mongoose.model('G76zd',new mongoose.Schema(),'G76zd');
const Monitor = mongoose.model('Monitor',new mongoose.Schema(),'Monitor');
let Monitors = new Map();
let arr=[
"51000020160504B7B7DE9BC2D5680D2C",
"510000201605042A9FEF5C5F1CDE06E8",
"51000020160508E7AE547BFDE3890F30",
"51000020160508E38ABA378B1046B2E1",
"51000020160508EFA8F58F6EACC9F810",
"51000020160508A49D4DFC05626E09A6",
"51000020160527639AF0663B06AF9E7B",
"5100002016052705A5E5D623BE100267",
"510000201605279E83F982E08E52F36E",
"51000020160529EEA937243F30590BD9",
"51000020160529E6AC914B1D457B0FA8",
"51000020160531E5884F6E17F39634A0",
"510000201605309CA487F5667AAD644E",
"51000020160512D59232D06FCE543A1E",
"5100002016051309BB2F5E631170CB19",
"5100002016051428BDAD0E34DFA83F67",
"51000020160515F09825F03552EF1A23",
"51000020160421155735266nXm5La5Ll",
"51000020160421121424717likcJ2fBT",
"51000020160416172821205SpZ3O8tEy",
"51000020160417130817484sMHiRCw8l",
"5100002016041717123993409pN1eOK3",
"51000020160418172134440rtG67ngAH",
"510000201604191745378985wg9cHLBP"
]
for(let i=0;i<arr.length;i++){
    Monitors.set(arr[i],mongoose.model(arr[i],new mongoose.Schema(),arr[i]));
}


module.exports = {G5zd,G65zd,G76zd,Monitor,Monitors}