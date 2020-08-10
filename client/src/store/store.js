import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";
Vue.use(Vuex);

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
    },
    changeCalendarAllData(state, value) {
      state.calendarAllData = value;
    },
    changeCalendarAllRawData(state, value) {
      state.calendarAllRawData = value;
    },
    changeRoadName(state, road) {
      state.roadName = road;
      console.log(state.roadName);
    },
    changeCalendarData(state, params) {
      if (state.calendarAllData) {
        let dataAll = null;
        let dataArr = [];
        let colorAll = null;
        let colorArr = [];
        let color = null;
        for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const element = params[key];
            if (state.roadName === "all") {
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
            } else {
              console.log(state.calendarAllRawData);
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
        const array = res.data;

        context.commit("changeCalendarAllRawData", res.data);
      });
    }
  }
});

export default store;
