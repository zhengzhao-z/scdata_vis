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
    }
  },
  mutations: {
    changeEventLieBie(state, value) {
      state.eventLieBie = value;
    },
    setOver(state, value) {
      state.over = value;
    },
    changeCalendarData(state, obj) {
      state.calendarData = obj;
    }
  },
  actions: {
    changeCalendarData(context, payload) {
      axios.get("../../static/calendar.json").then(res => {
        let dataAll = null;
        let dataArr = [];
        let colorAll = null;
        let colorArr = [];
        let color = null;
        for (const key in payload) {
          if (payload.hasOwnProperty(key)) {
            const element = payload[key];
            if (key === "all" && element.flag === true) {
              dataAll = res.data.all;
              colorAll = element.color;
              break;
            } else {
              if (element.flag === true) {
                dataArr.push(...res.data[key]);
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

        context.commit("changeCalendarData", {
          data: dataAll || dataArr,
          color: colorAll || color
        });
      });
    }
  }
});

export default store;
