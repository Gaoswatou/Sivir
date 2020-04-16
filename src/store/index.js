import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const store = new Vuex.Store({
  state: { navTitle: "", hiddenBackFlag: false },
  getters: {
    getNavTitle: state => {
      return state.navTitle;
    },
    getHiddenBackFlag: state => {
      return state.hiddenBackFlag;
    }
  },
  actions: {
    setNavTitle(context, content) {
      context.commit("handleSetNavTitle", content);
    },
    setHiddenBackFlag(context, content) {
      context.commit("handlesetHiddenBackFlag", content);
    }
  },
  mutations: {
    handleSetNavTitle(state, target) {
      state.navTitle = target;
    },
    handlesetHiddenBackFlag(state, target) {
      state.hiddenBackFlag = target;
    }
  }
});

export default store;
