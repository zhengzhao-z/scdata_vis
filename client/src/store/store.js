import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    eventLieBie: null
  },
  mutations: {
    changeEventLieBie(state, value) {
      state.eventLieBie = value;
    }
  }
});

export default store;
