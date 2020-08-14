import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";
Vue.use(Vuex);
const deduplicate = arr => {
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] == arr[j]) {
        //如果第一个等于第二个，splice方法删除第二个
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
};
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
    eventLieBie: ['全部'],
    over: true,    //over 和 detail切换,
    calendarData: {
      data: [],
      color: []
    },
    roadName: "all",
    calendarAllData: null,
    calendarAllRawData: null,
    eventArea: ["all"],
    
    monitors:[]   //监测站基本数据
  },
  mutations: {
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
    changeCalendarAllData(state, value) {
      state.calendarAllData = value;
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
          color: ["#ABDCFF", "#0396FF"],
          flag: true
        }
      });
    },
    changeCalendarData(state, params) {
      const arr = [];
      if (state.calendarAllRawData) {
        for (let i = 0; i < state.calendarAllRawData.length; i++) {
          arr.push(state.calendarAllRawData[i].time);
        }
      }
      const dateArr = deduplicate(arr);
      if (state.calendarAllData) {
        let dataAll = null;
        let dataArr = [];
        let colorAll = null;
        let colorArr = [];
        let color = null;
        if (state.roadName === "all") {
          for (const key in params) {
            if (params.hasOwnProperty(key)) {
              const element = params[key];
              if (key === "all" && element.flag === true) {
                dataAll = state.calendarAllData.all;
                colorAll = element.color;
                break;
              } else {
                if (element.flag === true) {
                  dataArr.push(...state.calendarAllData[key]);
                  colorArr.push(element.color);
                }
              }
            }
          }
          if (colorArr.length === 1) {
            color = colorArr[0];
          } else {
            color = ["#FFAA85", "#B3315F"];
          }
          state.calendarData.data = dataAll || dataArr;
          state.calendarData.color = colorAll || color;
        } else {
          console.log(state.roadName);
          let dataArr = [];
          let dataArrRaw = [];
          let colorArr = [];
          let dataAll = null;
          let colorAll = null;
          let color = null;
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
          if (colorArr.length === 1) {
            color = colorArr[0];
          } else {
            color = ["#FFAA85", "#B3315F"];
          }
          if (dataArrRaw.length) {
            dataArr = dateCount(dateArr, dataArrRaw);
          }

          state.calendarData.data = dataAll || dataArr;
          state.calendarData.color = colorAll || color;
        }
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
    setMonitors(state,value){
      state.monitors=value;
    }
  },
  actions: {
    changeCalendarAllData(context) {
      axios.get("../../static/calendar.json").then(res => {
        context.commit("changeCalendarAllData", res.data);

        context.commit("changeCalendarData", {
          all: {
            eventName: "all",
            eventName: "全部",
            color: ["#ABDCFF", "#0396FF"],
            flag: true
          }
        });
      });
      axios.get("../../static/calendarAll.json").then(res => {
        context.commit("changeCalendarAllRawData", res.data);
      });
    }
  }
});

export default store;
