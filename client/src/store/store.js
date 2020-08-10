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
const store = new Vuex.Store({
  state: {
    eventLieBie: null,
    over: true, //over 和 detail切换,
    calendarData: {
      data: [],
      color: []
    },
    roadName: "all",
    calendarAllData: null,
    calendarAllRawData: null,
    eventArea: ["all"]
  },
  mutations: {
    changeEventLieBie(state, value) {
      state.eventLieBie = value;
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
          console.log(state.calendarData.data);
          state.calendarData.color = colorAll || color;
        } else {
          console.log(state.roadName);

          const arr = [];
          for (let i = 0; i < state.calendarAllRawData.length; i++) {
            arr.push(state.calendarAllRawData[i].time);
          }
          const dateArr = deduplicate(arr);
          for (const key in params) {
            if (params.hasOwnProperty(key)) {
              console.log(key);
              const element = params[key];
              if (key === "all" && element.flag === true) {
                const result = [];
                const arr = [];
                for (let i = 0; i < state.calendarAllRawData.length; i++) {
                  const item = state.calendarAllRawData[i];
                  if (item.road === state.roadName) {
                    arr.push(item);
                  }
                }
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
                console.log(result);
                state.calendarData.data = result;
                break;
              } else {
                if (element.flag === true) {
                  console.log(key);
                }
              }
            }
          }
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
