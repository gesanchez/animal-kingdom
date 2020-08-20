import Vue from "vue";
import Vuex from "vuex";
import Categories from "./categories/module";
import Animals from "./animals/module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Categories,
    Animals
  }
});
