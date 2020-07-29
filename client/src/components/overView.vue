<template>
  <div class="overView"></div>
</template>

<script>
export default {
  name: "overView",
  data() {
    return {};
  },
<<<<<<< HEAD
  mounted(){
    
    function drawImg(thisel,dataList,width,heigth){
        let dx=55;
        let dy=15;
        let tempCalList=dataList.data.map(m=>m.length);
        let maxInx=0;
        for (let i=0;i<tempCalList.length;i++){
          if(tempCalList[i]>tempCalList[maxInx]){
            maxInx=i;
          }
=======
  mounted() {
    function drawImg(thisel, dataList, width, heigth) {
      let tempCalList = dataList.data.map(m => m.length);
      let maxInx = 0;
      for (let i = 0; i < tempCalList.length; i++) {
        if (tempCalList[i] > tempCalList[maxInx]) {
          maxInx = i;
>>>>>>> 00cad3bbecfcbbb6b56e630793798e28a9b9a223
        }
      }

      let dataNum = [];
      for (let j = 0; j < dataList.data[maxInx].length; j++) {
        for (let i = 0; i < dataList.data.length; i++) {
          if (dataNum[j] === null || dataNum[j] == undefined) {
            dataNum[j] = 0;
          }
          dataNum[j] += dataList.data[i][j];
        }
<<<<<<< HEAD
        //console.log(dataNum);
        let svg = d3.select(thisel)
            .append("svg")
            .attr("width",width)
            .attr("height",heigth)
        
        let drawRectWith;
        let drawRectHeigth;
        drawRectWith=width-dx;
        drawRectHeigth=heigth-dy;

        let genBottomWItemList=[];
        
        let heigthItem=((heigth-dataList.data.length*dataList.barCap)/dataList.data.length);
       for(let i=0;i<=dataList.data.length;i++){
          genBottomWItemList[i]=heigthItem*i+i*dataList.barCap;
        }
        //console.log(genBottomWItemList);
        var xScaleY = d3.scaleOrdinal()
              .domain(dataList.names)
              .range(genBottomWItemList)

			  var xAxisY = d3.axisLeft().scale(xScaleY);

				svg.append('g')
				   .attr('transform', 'translate('+(dx-5)+','+dy+')')
				   .call(xAxisY);
       // return ;
        let lastProp=-1;
        let lastXLists=[];
        for(let m=0;m<dataList.data.length;m++){

          let prop=Math.max(...dataList.data[m])/Math.max(...dataNum)*drawRectWith;//width最大值

          let scale = d3.scaleLinear()
            .domain([Math.min(...dataList.data[m]),Math.max(...dataList.data[m])])
            .range([1,prop]);
          
          svg.append("g")
            .selectAll("rect")
            .data(dataList.data[m])
            .enter()
            .append("rect")
            .attr("x",(d,i)=>{
              if(lastProp===-1){
                return 0+dx
              }
              return lastXLists[i]+dx
            })
            .attr("y",(d,i)=> {
              let temp=i*heigthItem+i*dataList.barCap
              //console.log((heigth-dataList.data.length*dataList.barCap));
              return temp+dy;
            })
            .attr("width",(d,i)=>{
              let temp=scale(d)
              if(lastXLists[i]===null||lastXLists[i]===undefined){
                lastXLists[i]=0;
              }
              lastXLists[i]+=temp
              //console.log(lastXLists)
              return  temp
            })
            .attr("height",heigthItem)
            .attr("fill",dataList.color[m])

          // // 绘制文字标签
          // svg.selectAll("text")
          //         .data(["test"])
          //         .enter().append("text")
          //         .attr("x", function(d,i){
          //             return 300;
          //         } )
          //         .attr("y",function(d,i){
          //            return 300;
          //         })
          //         .attr("dx", function(d,i){
          //             return 0;
          //         })
          //         // .attr("dy", 15)
          //         // .attr("text-anchor", "begin")
          //         .attr("font-size", 14)
          //         .attr("fill","black")
          //         .text(function(d,i){
          //             return d;
          //         });

            lastProp=prop
        }
        
    }

//找到路号下标
function findRoadCodeInx(roadCodeList,roadCode){
  for(let i=0;i<roadCodeList.length;i++){
    if(roadCodeList[i]===roadCode){
      return i;
    }
  }
  return -1;
}

//统计事件类型
function dataEventList(jsonDataList){
    let overView;
    let eventList=[];
    let finedFlag=true;
    overView=jsonDataList.overview;
    for(let i=0;i<overView.length;i++){
      finedFlag=false;
      for(let j=0;j<eventList.length;j++){
        if(overView[i].blockReason===eventList[j]){
          finedFlag=true;
          break;
        }
      }
      if(!finedFlag){
        eventList.push(overView[i].blockReason);
      }
    }
    return eventList;
}

//处理数据
function dataProcess(jsonDataList){

 let overView;
 overView=jsonDataList.overview;

 let resData;

 let roadCodeList=[]

 let overViewListTemp=[
 ];
 let eventList= dataEventList(jsonDataList);//阻断事件类型统计

 for(let i=0;i<overView.length;i++){

    let roadCodeInx=findRoadCodeInx(roadCodeList,overView[i].roadCode)
    if(roadCodeInx==-1){
      roadCodeInx=roadCodeList.length
      roadCodeList.push(overView[i].roadCode)
    }

    if(overViewListTemp[roadCodeInx]===undefined||overViewListTemp[roadCodeInx]===null){
      overViewListTemp[roadCodeInx]=[];
    }
   
   //获取事件下标
    let j;
    for(j=0;j<eventList.length;j++){
      if(eventList[j]===overView[i].blockReason){
        break;
      }
    }

    overViewListTemp[roadCodeInx][j]=parseInt(overView[i].number);
    
 }

  //不足填零
  let listMaxLen=Math.max(...overViewListTemp.map(m=>m.length))
  for(let i=0;i<overViewListTemp.length;i++){
    //if(overViewListTemp[i].length<listMaxLen){
      for(let j=0;j<listMaxLen;j++){
        if(overViewListTemp[i][j]===null||overViewListTemp[i][j]===undefined){
          overViewListTemp[i][j]=0;
        }
     // }
=======
      }
      //console.log(dataNum);
      let svg = d3
        .select(thisel)
        .append("svg")
        .attr("width", width)
        .attr("height", heigth);

      let lastProp = -1;
      let lastXLists = [];
      for (let m = 0; m < dataList.data.length; m++) {
        let prop =
          (Math.max(...dataList.data[m]) / Math.max(...dataNum)) * width; //width最大值

        let scale = d3
          .scaleLinear()
          .domain([
            Math.min(...dataList.data[m]),
            Math.max(...dataList.data[m])
          ])
          .range([1, prop]);

        svg
          .append("g")
          .selectAll("rect")
          .data(dataList.data[m])
          .enter()
          .append("rect")
          .attr("x", (d, i) => {
            if (lastProp === -1) {
              return 0;
            }
            return lastXLists[i];
          })
          .attr("y", (d, i) => {
            let temp =
              i *
                ((heigth - dataList.data.length * dataList.barCap) /
                  dataList.data.length) +
              i * dataList.barCap;
            //console.log((heigth-dataList.data.length*dataList.barCap));
            return temp;
          })
          .attr("width", (d, i) => {
            let temp = scale(d);
            if (lastXLists[i] === null || lastXLists[i] === undefined) {
              lastXLists[i] = 0;
            }
            lastXLists[i] += temp;
            //console.log(lastXLists)
            return temp;
          })
          .attr(
            "height",
            (heigth - dataList.data.length * dataList.barCap) /
              dataList.data.length
          )
          .attr("fill", dataList.color[m]);

        lastProp = prop;
      }
    }

    //找到路号下标
    function findRoadCodeInx(roadCodeList, roadCode) {
      for (let i = 0; i < roadCodeList.length; i++) {
        if (roadCodeList[i] === roadCode) {
          return i;
        }
      }
      return -1;
>>>>>>> 00cad3bbecfcbbb6b56e630793798e28a9b9a223
    }

<<<<<<< HEAD
  resData={
    "name":roadCodeList,
    "data":overViewListTemp,
    "event":eventList
  }
console.log(resData)
  //console.log(overViewListTemp);
  return resData;
}
=======
    //处理数据
    function dataProcess(jsonDataList) {
      let overView;
      overView = jsonDataList.overview;
>>>>>>> 00cad3bbecfcbbb6b56e630793798e28a9b9a223

      let roadCodeList = [];

<<<<<<< HEAD
        let heigth=800;
        let width=800;

      let  resData=dataProcess(jsonData);

      let dataList={
          color:d3.schemeSet1.concat(d3.schemeSet2).concat(d3.schemeSet3),
          barCap:5,
          data:resData.data,
          names:resData.name
        }
         
        //console.log(dataList.data)
        //console.log(dataList.names)
        drawImg(this.$el,dataList,width,heigth)
=======
      let overViewListTemp = [];

      for (let i = 0; i < overView.length; i++) {
        let roadCodeInx = findRoadCodeInx(roadCodeList, overView[i].roadCode);
        if (roadCodeInx == -1) {
          roadCodeInx = roadCodeList.length;
          roadCodeList.push(overView[i].roadCode);
        }

        if (
          overViewListTemp[roadCodeInx] === undefined ||
          overViewListTemp[roadCodeInx] === null
        ) {
          overViewListTemp[roadCodeInx] = [];
        }
        overViewListTemp[roadCodeInx].push(parseInt(overView[i].number));
      }

      let listMaxLen = Math.max(...overViewListTemp.map(m => m.length));
      for (let i = 0; i < overViewListTemp.length; i++) {
        if (overViewListTemp[i].length < listMaxLen) {
          for (let j = overViewListTemp[i].length; j < listMaxLen; j++) {
            overViewListTemp[i][j] = 0;
          }
        }
      }
>>>>>>> 00cad3bbecfcbbb6b56e630793798e28a9b9a223

      // console.log(overViewListTemp);
      return overViewListTemp;
    }

    let jsonData = {
      overview: [
        { roadCode: "G0512", blockReason: "执行警备任务", number: "47" },
        { roadCode: "G0512", blockReason: "执法事件", number: "2" },
        { roadCode: "G0512", blockReason: "雾霾", number: "59" },
        { roadCode: "G0512", blockReason: "桥隧施工养护", number: "1525" },
        { roadCode: "G0512", blockReason: "其它", number: "369" },
        { roadCode: "G0512", blockReason: "其他", number: "276" },
        { roadCode: "G0512", blockReason: "泥石流", number: "22" },
        { roadCode: "G0512", blockReason: "降雨（积水）", number: "142" },
        { roadCode: "G0512", blockReason: "滑坡", number: "5" },
        { roadCode: "G0512", blockReason: "公路施工养护", number: "2665" },
        { roadCode: "G0512", blockReason: "服务区事件", number: "2" },
        { roadCode: "G0512", blockReason: "大风（横风）", number: "23" },
        { roadCode: "G0512", blockReason: "车流量大", number: "322" },
        { roadCode: "G0512", blockReason: "车辆交通事故", number: "195" },
        { roadCode: "G0512", blockReason: "车辆故障", number: "9" },
        { roadCode: "G0512", blockReason: "冰雹", number: "1" },
        { roadCode: "G42", blockReason: "重大社会活动", number: "1" },
        { roadCode: "G42", blockReason: "雾霾", number: "23" },
        { roadCode: "G42", blockReason: "危险品泄漏", number: "2" },
        { roadCode: "G42", blockReason: "桥隧施工养护", number: "42" },
        { roadCode: "G42", blockReason: "其它", number: "183" },
        { roadCode: "G42", blockReason: "其他", number: "83" },
        { roadCode: "G42", blockReason: "降雨（积水）", number: "76" },
        { roadCode: "G42", blockReason: "滑坡", number: "3" },
        { roadCode: "G42", blockReason: "公路施工养护", number: "2" },
        { roadCode: "G42", blockReason: "大风（横风）", number: "1" },
        { roadCode: "G42", blockReason: "车流量大", number: "197" },
        { roadCode: "G42", blockReason: "车辆交通事故", number: "62" },
        { roadCode: "G42", blockReason: "车辆故障", number: "17" },
        { roadCode: "G4202", blockReason: "执行警备任务", number: "16" },
        { roadCode: "G4202", blockReason: "雾霾", number: "2" },
        { roadCode: "G4202", blockReason: "其它", number: "69" },
        { roadCode: "G4202", blockReason: "其他", number: "32" },
        { roadCode: "G4202", blockReason: "公路施工养护", number: "24" },
        { roadCode: "G4202", blockReason: "车流量大", number: "1" },
        { roadCode: "G4202", blockReason: "车辆交通事故", number: "22" },
        { roadCode: "G4215", blockReason: "执行警备任务", number: "33" },
        { roadCode: "G4215", blockReason: "雾霾", number: "31" },
        { roadCode: "G4215", blockReason: "桥隧施工养护", number: "134" },
        { roadCode: "G4215", blockReason: "其它", number: "306" },
        { roadCode: "G4215", blockReason: "其他", number: "276" },
        { roadCode: "G4215", blockReason: "降雨（积水）", number: "125" },
        { roadCode: "G4215", blockReason: "公路施工养护", number: "1241" },
        { roadCode: "G4215", blockReason: "车流量大", number: "175" },
        { roadCode: "G4215", blockReason: "车辆交通事故", number: "123" },
        { roadCode: "G4216", blockReason: "执行警备任务", number: "6" },
        { roadCode: "G4216", blockReason: "雾霾", number: "17" },
        { roadCode: "G4216", blockReason: "涉隧事故", number: "1" },
        { roadCode: "G4216", blockReason: "桥隧施工养护", number: "10" },
        { roadCode: "G4216", blockReason: "其它", number: "62" },
        { roadCode: "G4216", blockReason: "其他", number: "24" },
        { roadCode: "G4216", blockReason: "降雨（积水）", number: "28" },
        { roadCode: "G4216", blockReason: "公路施工养护", number: "22" },
        { roadCode: "G4216", blockReason: "车流量大", number: "3" },
        { roadCode: "G4216", blockReason: "车辆交通事故", number: "28" },
        { roadCode: "G4216", blockReason: "车辆故障", number: "7" },
        { roadCode: "G4217", blockReason: "执行警备任务", number: "41" },
        { roadCode: "G4217", blockReason: "桥隧施工养护", number: "1" },
        { roadCode: "G4217", blockReason: "其它", number: "73" },
        { roadCode: "G4217", blockReason: "其他", number: "9" },
        { roadCode: "G4217", blockReason: "泥石流", number: "1" },
        { roadCode: "G4217", blockReason: "公路施工养护", number: "71" },
        { roadCode: "G4217", blockReason: "大风（横风）", number: "1" },
        { roadCode: "G4217", blockReason: "车流量大", number: "16" },
        { roadCode: "G4217", blockReason: "车辆交通事故", number: "10" },
        { roadCode: "G4218", blockReason: "雾霾", number: "5" },
        { roadCode: "G4218", blockReason: "危险品泄漏", number: "1" },
        { roadCode: "G4218", blockReason: "其它", number: "77" },
        { roadCode: "G4218", blockReason: "其他", number: "73" },
        { roadCode: "G4218", blockReason: "结冰", number: "44" },
        { roadCode: "G4218", blockReason: "降雨（积水）", number: "9" },
        { roadCode: "G4218", blockReason: "降雪（积雪）", number: "2" },
        { roadCode: "G4218", blockReason: "公路施工养护", number: "53" },
        { roadCode: "G4218", blockReason: "服务区事件", number: "1" },
        { roadCode: "G4218", blockReason: "大风（横风）", number: "8" },
        { roadCode: "G4218", blockReason: "车流量大", number: "7" },
        { roadCode: "G4218", blockReason: "车辆交通事故", number: "38" },
        { roadCode: "G4218", blockReason: "车辆故障", number: "19" },
        { roadCode: "G5", blockReason: "执行警备任务", number: "90" },
        { roadCode: "G5", blockReason: "雾霾", number: "117" },
        { roadCode: "G5", blockReason: "涉隧事故", number: "12" },
        { roadCode: "G5", blockReason: "桥隧施工养护", number: "3" },
        { roadCode: "G5", blockReason: "其它", number: "428" },
        { roadCode: "G5", blockReason: "其他", number: "168" },
        { roadCode: "G5", blockReason: "结冰", number: "72" },
        { roadCode: "G5", blockReason: "降雨（积水）", number: "22" },
        { roadCode: "G5", blockReason: "降雪（积雪）", number: "66" },
        { roadCode: "G5", blockReason: "公路施工养护", number: "4412" },
        { roadCode: "G5", blockReason: "车流量大", number: "274" },
        { roadCode: "G5", blockReason: "车辆交通事故", number: "751" },
        { roadCode: "G5", blockReason: "车辆故障", number: "32" },
        { roadCode: "G5012", blockReason: "重大社会活动", number: "1" },
        { roadCode: "G5012", blockReason: "雾霾", number: "8" },
        { roadCode: "G5012", blockReason: "桥隧施工养护", number: "8" },
        { roadCode: "G5012", blockReason: "其它", number: "72" },
        { roadCode: "G5012", blockReason: "其他", number: "46" },
        { roadCode: "G5012", blockReason: "降雨（积水）", number: "47" },
        { roadCode: "G5012", blockReason: "滑坡", number: "1" },
        { roadCode: "G5012", blockReason: "公路施工养护", number: "17" },
        { roadCode: "G5012", blockReason: "车流量大", number: "2" },
        { roadCode: "G5012", blockReason: "车辆交通事故", number: "7" },
        { roadCode: "G5013", blockReason: "执行警备任务", number: "43" },
        { roadCode: "G5013", blockReason: "雾霾", number: "3" },
        { roadCode: "G5013", blockReason: "其它", number: "161" },
        { roadCode: "G5013", blockReason: "其他", number: "57" },
        { roadCode: "G5013", blockReason: "降雨（积水）", number: "15" },
        { roadCode: "G5013", blockReason: "公路施工养护", number: "39" },
        { roadCode: "G5013", blockReason: "车流量大", number: "14" },
        { roadCode: "G5013", blockReason: "车辆交通事故", number: "23" },
        { roadCode: "G5515", blockReason: "执行警备任务", number: "3" },
        { roadCode: "G5515", blockReason: "执法事件", number: "12" },
        { roadCode: "G5515", blockReason: "雾霾", number: "29" },
        { roadCode: "G5515", blockReason: "危险品泄漏", number: "2" },
        { roadCode: "G5515", blockReason: "涉隧事故", number: "11" },
        { roadCode: "G5515", blockReason: "桥隧施工养护", number: "66" },
        { roadCode: "G5515", blockReason: "其它", number: "127" },
        { roadCode: "G5515", blockReason: "其他", number: "93" },
        { roadCode: "G5515", blockReason: "降雨（积水）", number: "36" },
        { roadCode: "G5515", blockReason: "公路施工养护", number: "189" },
        { roadCode: "G5515", blockReason: "车辆交通事故", number: "45" },
        { roadCode: "G65", blockReason: "执行警备任务", number: "90" },
        { roadCode: "G65", blockReason: "雾霾", number: "6" },
        { roadCode: "G65", blockReason: "桥隧施工养护", number: "30" },
        { roadCode: "G65", blockReason: "其它", number: "167" },
        { roadCode: "G65", blockReason: "其他", number: "126" },
        { roadCode: "G65", blockReason: "降雨（积水）", number: "56" },
        { roadCode: "G65", blockReason: "滑坡", number: "14" },
        { roadCode: "G65", blockReason: "公路施工养护", number: "73" },
        { roadCode: "G65", blockReason: "车流量大", number: "18" },
        { roadCode: "G65", blockReason: "车辆交通事故", number: "36" },
        { roadCode: "G75", blockReason: "执行警备任务", number: "14" },
        { roadCode: "G75", blockReason: "执法事件", number: "1" },
        { roadCode: "G75", blockReason: "雾霾", number: "19" },
        { roadCode: "G75", blockReason: "桥隧施工养护", number: "109" },
        { roadCode: "G75", blockReason: "其它", number: "152" },
        { roadCode: "G75", blockReason: "其他", number: "108" },
        { roadCode: "G75", blockReason: "降雨（积水）", number: "5" },
        { roadCode: "G75", blockReason: "公路施工养护", number: "31" },
        { roadCode: "G75", blockReason: "服务区事件", number: "21" },
        { roadCode: "G75", blockReason: "车流量大", number: "133" },
        { roadCode: "G75", blockReason: "车辆交通事故", number: "20" },
        { roadCode: "G75", blockReason: "车辆故障", number: "3" },
        { roadCode: "G76", blockReason: "雾霾", number: "44" },
        { roadCode: "G76", blockReason: "危险品泄漏", number: "1" },
        { roadCode: "G76", blockReason: "涉隧事故", number: "1" },
        { roadCode: "G76", blockReason: "桥隧施工养护", number: "22" },
        { roadCode: "G76", blockReason: "其它", number: "120" },
        { roadCode: "G76", blockReason: "其他", number: "115" },
        { roadCode: "G76", blockReason: "降雨（积水）", number: "135" },
        { roadCode: "G76", blockReason: "公路施工养护", number: "48" },
        { roadCode: "G76", blockReason: "地震", number: "1" },
        { roadCode: "G76", blockReason: "车流量大", number: "72" },
        { roadCode: "G76", blockReason: "车辆交通事故", number: "200" },
        { roadCode: "G76", blockReason: "车辆故障", number: "15" },
        { roadCode: "G76", blockReason: "冰雹", number: "16" },
        { roadCode: "G85", blockReason: "雾霾", number: "40" },
        { roadCode: "G85", blockReason: "桥隧施工养护", number: "15" },
        { roadCode: "G85", blockReason: "其它", number: "281" },
        { roadCode: "G85", blockReason: "其他", number: "193" },
        { roadCode: "G85", blockReason: "降雨（积水）", number: "45" },
        { roadCode: "G85", blockReason: "公路施工养护", number: "228" },
        { roadCode: "G85", blockReason: "车流量大", number: "28" },
        { roadCode: "G85", blockReason: "车辆交通事故", number: "129" },
        { roadCode: "G85", blockReason: "车辆故障", number: "1" },
        { roadCode: "G85", blockReason: "冰雹", number: "1" },
        { roadCode: "G93", blockReason: "执行警备任务", number: "19" },
        { roadCode: "G93", blockReason: "执法事件", number: "10" },
        { roadCode: "G93", blockReason: "雾霾", number: "86" },
        { roadCode: "G93", blockReason: "桥隧施工养护", number: "158" },
        { roadCode: "G93", blockReason: "其它", number: "324" },
        { roadCode: "G93", blockReason: "其他", number: "219" },
        { roadCode: "G93", blockReason: "降雨（积水）", number: "40" },
        { roadCode: "G93", blockReason: "滑坡", number: "9" },
        { roadCode: "G93", blockReason: "公路施工养护", number: "296" },
        { roadCode: "G93", blockReason: "地震", number: "1" },
        { roadCode: "G93", blockReason: "车流量大", number: "14" },
        { roadCode: "G93", blockReason: "车辆交通事故", number: "61" },
        { roadCode: "G93", blockReason: "车辆故障", number: "9" },
        { roadCode: "S1", blockReason: "执行警备任务", number: "4" },
        { roadCode: "S1", blockReason: "雾霾", number: "16" },
        { roadCode: "S1", blockReason: "其它", number: "151" },
        { roadCode: "S1", blockReason: "其他", number: "123" },
        { roadCode: "S1", blockReason: "公路施工养护", number: "773" },
        { roadCode: "S1", blockReason: "车流量大", number: "4" },
        { roadCode: "S1", blockReason: "车辆交通事故", number: "34" },
        { roadCode: "S11", blockReason: "执行警备任务", number: "4" },
        { roadCode: "S11", blockReason: "雾霾", number: "11" },
        { roadCode: "S11", blockReason: "其它", number: "4" },
        { roadCode: "S11", blockReason: "其他", number: "37" },
        { roadCode: "S11", blockReason: "降雨（积水）", number: "30" },
        { roadCode: "S11", blockReason: "大风（横风）", number: "10" },
        { roadCode: "S11", blockReason: "车辆交通事故", number: "15" },
        { roadCode: "S2", blockReason: "执行警备任务", number: "1" },
        { roadCode: "S2", blockReason: "雾霾", number: "20" },
        { roadCode: "S2", blockReason: "桥隧施工养护", number: "87" },
        { roadCode: "S2", blockReason: "其它", number: "245" },
        { roadCode: "S2", blockReason: "其他", number: "107" },
        { roadCode: "S2", blockReason: "降雨（积水）", number: "55" },
        { roadCode: "S2", blockReason: "滑坡", number: "1" },
        { roadCode: "S2", blockReason: "公路施工养护", number: "26" },
        { roadCode: "S2", blockReason: "服务区事件", number: "1" },
        { roadCode: "S2", blockReason: "车流量大", number: "144" },
        { roadCode: "S2", blockReason: "车辆交通事故", number: "88" },
        { roadCode: "S21", blockReason: "执行警备任务", number: "1" },
        { roadCode: "S21", blockReason: "雾霾", number: "2" },
        { roadCode: "S21", blockReason: "其它", number: "19" },
        { roadCode: "S21", blockReason: "其他", number: "40" },
        { roadCode: "S21", blockReason: "降雨（积水）", number: "24" },
        { roadCode: "S21", blockReason: "公路施工养护", number: "156" },
        { roadCode: "S21", blockReason: "车流量大", number: "8" },
        { roadCode: "S21", blockReason: "车辆交通事故", number: "31" },
        { roadCode: "S26", blockReason: "桥隧施工养护", number: "20" },
        { roadCode: "S26", blockReason: "其它", number: "30" },
        { roadCode: "S26", blockReason: "其他", number: "25" },
        { roadCode: "S26", blockReason: "降雨（积水）", number: "1" },
        { roadCode: "S26", blockReason: "公路施工养护", number: "214" },
        { roadCode: "S26", blockReason: "地震", number: "8" },
        { roadCode: "S26", blockReason: "车辆交通事故", number: "4" },
        { roadCode: "S40", blockReason: "执行警备任务", number: "1" },
        { roadCode: "S40", blockReason: "雾霾", number: "14" },
        { roadCode: "S40", blockReason: "桥隧施工养护", number: "108" },
        { roadCode: "S40", blockReason: "其它", number: "55" },
        { roadCode: "S40", blockReason: "其他", number: "50" },
        { roadCode: "S40", blockReason: "降雨（积水）", number: "13" },
        { roadCode: "S40", blockReason: "滑坡", number: "1" },
        { roadCode: "S40", blockReason: "公路施工养护", number: "1147" },
        { roadCode: "S40", blockReason: "车流量大", number: "16" },
        { roadCode: "S40", blockReason: "车辆交通事故", number: "17" },
        { roadCode: "S40", blockReason: "车辆故障", number: "3" },
        { roadCode: "S4202", blockReason: "执行警备任务", number: "261" },
        { roadCode: "S4202", blockReason: "雾霾", number: "46" },
        { roadCode: "S4202", blockReason: "危险品泄漏", number: "22" },
        { roadCode: "S4202", blockReason: "桥隧施工养护", number: "42" },
        { roadCode: "S4202", blockReason: "其它", number: "249" },
        { roadCode: "S4202", blockReason: "其他", number: "75" },
        { roadCode: "S4202", blockReason: "降雨（积水）", number: "15" },
        { roadCode: "S4202", blockReason: "公路施工养护", number: "240" },
        { roadCode: "S4202", blockReason: "车流量大", number: "8" },
        { roadCode: "S4202", blockReason: "车辆交通事故", number: "66" },
        { roadCode: "S4202", blockReason: "车辆故障", number: "1" },
        { roadCode: "S4203", blockReason: "执行警备任务", number: "39" },
        { roadCode: "S4203", blockReason: "雾霾", number: "24" },
        { roadCode: "S4203", blockReason: "其它", number: "226" },
        { roadCode: "S4203", blockReason: "其他", number: "17" },
        { roadCode: "S4203", blockReason: "降雨（积水）", number: "22" },
        { roadCode: "S4203", blockReason: "公路施工养护", number: "2" },
        { roadCode: "S4203", blockReason: "车流量大", number: "79" },
        { roadCode: "S4203", blockReason: "车辆交通事故", number: "108" },
        { roadCode: "S66", blockReason: "执行警备任务", number: "2" },
        { roadCode: "S66", blockReason: "执法事件", number: "6" },
        { roadCode: "S66", blockReason: "雾霾", number: "15" },
        { roadCode: "S66", blockReason: "其它", number: "125" },
        { roadCode: "S66", blockReason: "其他", number: "44" },
        { roadCode: "S66", blockReason: "降雨（积水）", number: "61" },
        { roadCode: "S66", blockReason: "公路施工养护", number: "277" },
        { roadCode: "S66", blockReason: "车流量大", number: "5" },
        { roadCode: "S66", blockReason: "车辆交通事故", number: "58" },
        { roadCode: "S8", blockReason: "重大社会活动", number: "1" },
        { roadCode: "S8", blockReason: "执行警备任务", number: "6" },
        { roadCode: "S8", blockReason: "雾霾", number: "5" },
        { roadCode: "S8", blockReason: "桥隧施工养护", number: "5" },
        { roadCode: "S8", blockReason: "其它", number: "75" },
        { roadCode: "S8", blockReason: "其他", number: "24" },
        { roadCode: "S8", blockReason: "降雨（积水）", number: "1" },
        { roadCode: "S8", blockReason: "公路施工养护", number: "265" },
        { roadCode: "S8", blockReason: "车流量大", number: "1" },
        { roadCode: "S8", blockReason: "车辆交通事故", number: "5" }
      ]
    };

    let heigth = 600;
    let width = 1000;

    let dataList = {
      color: [
        "red",
        "blue",
        "black",
        "yellow",
        "blue",
        "black",
        "yellow",
        "red",
        "blue",
        "black",
        "yellow",
        "red",
        "blue",
        "black",
        "yellow",
        "blue",
        "black",
        "yellow",
        "blue",
        "black",
        "yellow",
        "red",
        "blue",
        "black",
        "yellow",
        "blue",
        "black",
        "yellow"
      ],
      barCap: 5,
      data: dataProcess(jsonData)
    };

    drawImg(this.$el, dataList, width, heigth);

    // //创建具有贝茨分布规律的随机数,0~1
    // var datas = d3.range(1000).map(function() {
    // 	return d3.randomBates(10)();
    // });

    // var width = 800,
    // height = 400,
    // padding = {
    // 	top: 10,
    // 	right: 40,
    // 	bottom: 40,
    // 	left: 40
    // };

    // var svg = d3.select(this.$el)
    // .append("svg")
    // .attr('width', width + 'px')
    // .attr('height', height + 'px');

    // // x轴
    // var xScale = d3.scaleLinear()
    // .range([padding.left, width - padding.right]);
    // // 将x轴，0~1，轴分成20个刻度 [0,0.05,0.1,0.15 ...,1.00]

    // // var xAxis = d3.axisBottom()
    // // .scale(xScale)
    // // .ticks(20);
    // // svg.append('g')
    // // .call(xAxis)
    // // .attr("transform", "translate(0," + (height - padding.bottom) + ")");

    // // 构造一个直方图布局,返回随机数在每个x轴刻度区域出现的次数
    // var his = d3.histogram()
    // .domain(xScale.domain())
    // .thresholds(xScale.ticks(20))
    // (datas);

    // // y轴
    // var yScale = d3.scaleLinear()
    // .domain([0, d3.max(his,
    // function(d) {
    // 	return d.length;
    // })])
    // .range([height - padding.bottom, padding.top]);

    // // var yAxis = d3.axisLeft()
    // // .scale(yScale)
    // // .ticks(10);
    // // svg.append('g')
    // // .call(yAxis)
    // // .attr("transform", "translate(" + padding.left + ",0)");

    // var bar = svg.selectAll(".bar")
    // .data(his)
    // .join("g")
    // .attr("class", "bar")
    // .attr("transform",
    // function(d) {
    // 	return "translate(" + xScale(d.x0) + "," + yScale(d.length) + ")";
    // });

    // // 构造柱
    // bar.append("rect")
    // .attr("x", 1)
    // .attr("fill","#ff00ff")
    // .attr("height", xScale(his[0].x1) - xScale(his[0].x0) - 1)
    // .attr("width",
    // function(d) {
    // 	return height - yScale(d.length) - padding.bottom;
    // });

    // bar.append("text")
    // .attr("dy", ".75em")
    // .attr("y", 6)
    // .attr("x", (xScale(his[0].x1) - xScale(his[0].x0)) / 2)
    // .attr("text-anchor", "middle")
    // .attr("font-size", "8px")
    // .attr("fill", "White")
    // .text(function(d) {
    // 	return d.length;
    // });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
