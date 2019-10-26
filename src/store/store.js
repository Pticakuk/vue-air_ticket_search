import Vue from 'vue';
import Vuex from 'vuex';
import assign from 'lodash-es/assign';
import get from 'lodash-es/get';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    generatedIslands: [],
    offers: [],
  },
  mutations: {
    saveIslands(state, payload) {
      assign(state, { generatedIslands: payload });
    },
    saveOffers(state, payload) {
      assign(state, { offers: payload });
    },
  },
  actions: {
    saveIslands({ commit }, generatedIslands) {
      commit('saveIslands', generatedIslands);
    },
    saveOffers({ commit }, offers) {
      commit('saveOffers', offers);
    },
  },
  getters: {
    generatedIslands(state) {
      return get(state, 'generatedIslands', []);;
    },
    notFilteredOffers(state) {
      return get(state, 'offers', []);
    },
  },
});
