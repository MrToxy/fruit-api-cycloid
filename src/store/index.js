/* eslint-disable no-unreachable */
import Vue from "vue";
import Vuex from "vuex";
import $api from "@/api";
import { normalizeFruits, diffInDaysBetweenDates } from "@/utils";
Vue.use(Vuex);

const fruitStates = {
  rotting: (diff) => diff > 0 && diff < 5,
  healthy: (diff) => diff >= 5,
  rotten: (diff) => diff <= 0,
  fallback: "uknown",
  getState(diff) {
    const state = Object.keys(this).find((key) => this[key](diff));
    return state || this.fallback;
  },
};

export default new Vuex.Store({
  state: {
    fruits: [],
    filters: {
      price: {
        min: 0,
        max: 0,
      },
      state: null,
      taste: null,
    },
  },
  getters: {
    fruits: (state) =>
      state.fruits.map((fruit) => {
        const diff = diffInDaysBetweenDates(Date.now(), fruit.expires);
        return {
          ...fruit,
          expiresIn: diff,
          state: fruitStates.getState(
            diffInDaysBetweenDates(Date.now(), fruit.expires)
          ),
        };
      }),

    price: (state) => {
      const prices = state.fruits.reduce(
        (acc, { price }) => {
          const parsedPrice = parseFloat(price);

          acc.min = Math.min(acc.min ?? parsedPrice, parsedPrice);
          acc.max = Math.max(acc.max ?? parsedPrice, parsedPrice);
          return acc;
        },

        { min: null, max: null }
      );
      return prices;
    },
    states: (state, getters) =>
      Array.from(
        new Set(
          getters.fruits.reduce((acc, fruit) => acc.concat(fruit.state), [])
        )
      ),
    taste: (state) =>
      Array.from(
        new Set(
          state.fruits.reduce((acc, fruit) => acc.concat(fruit.taste), [])
        )
      ),
  },
  mutations: {
    SET_FRUITS(state, fruits) {
      state.fruits = fruits;
    },
    DELETE_FRUIT(state, id) {
      const idx = state.fruits.findIndex((fruit) => fruit.id === id);
      if (idx !== -1) state.fruits.splice(idx, 1);
    },
  },
  actions: {
    async fetchFruits({ commit }) {
      const { data: fruits } = await $api.all();
      const normalizedFruits = await normalizeFruits(fruits);
      commit("SET_FRUITS", normalizedFruits);
    },
    async deleteFruit({ commit }, { id }) {
      commit("DELETE_FRUIT", id);
      await $api.delete(id);
    },
  },
});
