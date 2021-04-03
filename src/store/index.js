import Vue from "vue";
import Vuex from "vuex";
import $api from "@/api";
import { normalizeFruits } from "@/utils";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fruits: [],
  },
  mutations: {
    SET_FRUITS(state, fruits) {
      state.fruits = fruits;
    },
  },
  actions: {
    async fetchFruits({ commit }) {
      try {
        const { data: fruits } = await $api.all();
        const normalizedFruits = await normalizeFruits(fruits);
        commit("SET_FRUITS", normalizedFruits);
      } catch (error) {
        console.log("error: ", error);
      }
    },
  },
});
