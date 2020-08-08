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
        let data;
        console.log(payload.eventName);
        switch (payload.eventName) {
          case "vehicleAccident":
            data = res.data.vehicleAccident;
            break;
          case "traffic":
            data = res.data.traffic;
            break;
          case "rainfall":
            data = res.data.rainfall;
            break;
          case "snowfall":
            data = res.data.snowfall;
            break;
          case "smog":
            data = res.data.smog;
            break;
          default:
            data = res.data.all;
            break;
        }
        context.commit("changeCalendarData", {
          data: data,
          color: payload.color
        });
      });
    }
  }
});

export default store;
