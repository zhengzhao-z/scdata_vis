import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    eventLieBie: null,
    over:true  //over 和 detail切换
  },
  mutations: {
    changeEventLieBie(state, value) {
      state.eventLieBie = value;
    },
    setOver(state,value){
      state.over=value;
    }
  }
});

export default store;
