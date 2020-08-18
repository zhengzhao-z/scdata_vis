import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";
Vue.use(Vuex);

function getDateData(year) {
  year = year || "2019";
  let date = new Date(year + "-01-01").getTime();
  let end = new Date(year + "-07-1").getTime();
  let dayTime = 3600 * 24 * 1000;
  let data = [];
  for (let time = date; time < end; time += dayTime) {
    let timeStamp = new Date(time);
    let year = timeStamp.getFullYear();
    let month = timeStamp.getMonth() + 1;

    let day = timeStamp.getDate();

    data.push(`${year}/${month}/${day}`);
  }
  return data;
}
const dateCount = (dateArr, arr) => {
  const result = [];
  for (let i = 0; i < dateArr.length; i++) {
    let date = dateArr[i];
    let singleDateArr = [];
    let count = 0;
    for (let j = 0; j < arr.length; j++) {
      if (arr[j].time === date) {
        singleDateArr.push(arr[j]);
      }
    }
    count = singleDateArr.length;
    result.push({
      count,
      time: date
    });
  }
  return result;
};
const store = new Vuex.Store({
  state: {
    eventLieBie: ["全部"],
    over: true, //over 和 detail切换,
    calendarData: {
      data: [],
      color: []
    },
    roadName: "all",
    calendarAllRawData: null,
    eventArea: ["all"],
    riskIsShow: false,
    selectDate: null,
    monitors: [], //监测站基本数据,
    risk:[], //危险曲线基本数据 默认G5
    traffic:[]  //traffic
  },
  mutations: {
    changeRiskIsShow(state, value) {
      state.riskIsShow = value;
      console.log(state.riskIsShow);
    },
    changeSelectedDate(state, newDate) {
      state.selectDate = newDate;
    },
    changeEventLieBie(state, events) {
      const arr = [];
      for (const key in events) {
        if (events.hasOwnProperty(key)) {
          const element = events[key];
          if (element.flag === true) {
            arr.push(element.eventNameCN);
          }
        }
      }
      state.eventLieBie = arr;
    },
    setOver(state, value) {
      state.over = value;
      this.commit("changeRoadName", "all");
    },
    changeCalendarAllRawData(state, value) {
      state.calendarAllRawData = value;
    },
    changeRoadName(state, road) {
      state.roadName = road;
      this.commit("changeCalendarData", {
        all: {
          eventName: "all",
          eventNameCN: "全部",
          color: ["#bdc3c7", "#2c3e50"],
          flag: true
        }
      });
    },
    changeCalendarData(state, params) {
      const dateArr = getDateData(2019);
      if (state.calendarAllRawData) {
        let dataAll = null;
        let dataArrRaw = [];
        let dataArr = [];
        let colorAll = null;
        let colorArr = [];
        let color = null;
        if (state.roadName === "all") {
          for (const key in params) {
            if (params.hasOwnProperty(key)) {
              const element = params[key];
              if (key === "all" && element.flag === true) {
                dataAll = dateCount(dateArr, state.calendarAllRawData);
                colorAll = element.color;
                break;
              } else {
                if (element.flag === true) {
                  const arr = state.calendarAllRawData.filter(item => {
                    if (item.reason === element.eventNameCN) {
                      return true;
                    }
                  });
                  dataArrRaw.push(...arr);
                  colorArr.push(element.color);
                }
              }
            }
          }
        } else {
          for (const key in params) {
            if (params.hasOwnProperty(key)) {
              const element = params[key];
              if (key === "all" && element.flag === true) {
                // console.log(element.eventNameCN);
                const arr = state.calendarAllRawData.filter(item => {
                  if (item.road === state.roadName) {
                    return true;
                  }
                });
                dataAll = dateCount(dateArr, arr);
                colorAll = element.color;
                break;
              } else {
                if (element.flag === true) {
                  const arr = state.calendarAllRawData.filter(item => {
                    if (
                      item.road === state.roadName &&
                      item.reason === element.eventNameCN
                    ) {
                      return true;
                    }
                  });
                  dataArrRaw.push(...arr);
                  colorArr.push(element.color);
                }
              }
            }
          }
        }
        if (colorArr.length === 1) {
          color = colorArr[0];
        } else {
          color = ["#FFAA85", "#B3315F"];
        }
        if (dataArrRaw.length) {
          dataArr = dateCount(dateArr, dataArrRaw);
        }

        state.calendarData.data = dataAll || dataArr;
        state.calendarData.color = ["#fceabb", "#f8b500"];
      }
    },
    changeEventArea(state, params) {
      let eventArea = [];
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const element = params[key];
          if (key === "all" && element.flag === true) {
            eventArea = ["all"];
            break;
          } else {
            if (element.flag === true) {
              eventArea.push(key);
            }
          }
        }
      }
      state.eventArea = eventArea;
    },
    setMonitors(state, value) {
      state.monitors = value;
    },
    setRisk(state,value){
      state.risk=value;
    },
    setTraffic(state,value){
      state.traffic=value;
    }
  },
  actions: {
    changeCalendarAllData(context) {
      axios.get("../../static/calendarAllData.json").then(res => {
        context.commit("changeCalendarAllRawData", res.data);
        context.commit("changeCalendarData", {
          all: {
            eventName: "all",
            eventName: "全部",
            color: ["#ABDCFF", "#0396FF"],
            flag: true
          }
        });
      });
    }
  }
});

export default store;
