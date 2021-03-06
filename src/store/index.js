/* eslint-disable no-unreachable */
import Vue from "vue";
import Vuex from "vuex";
import { normalizeFruits, diffInDaysBetweenDates } from "@/utils";
import $api from "@/api";
Vue.use(Vuex);

export const fruitStates = {
  rotting: (diff) => diff > 0 && diff < 5,
  healthy: (diff) => diff >= 5,
  rotten: (diff) => diff <= 0,
  fallback: "uknown",
  getState(diff) {
    const state = Object.keys(this).find((key) => this[key](diff));
    return state || this.fallback;
  },
};

export const getters = {
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

  price: (_state, getters) => {
    const prices = getters.fruits.reduce(
      (acc, { price }) => {
        const parsedPrice = parseFloat(price);

        acc.min = Math.min(acc.min, parsedPrice);
        acc.max = Math.max(acc.max, parsedPrice);
        return acc;
      },

      { min: 0, max: 0 }
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
      new Set(state.fruits.reduce((acc, fruit) => acc.concat(fruit.taste), []))
    ),
};

export const mutations = {
  SET_FRUITS(state, fruits) {
    state.fruits = fruits;
  },
  ADD_FRUIT(state, fruit) {
    state.fruits.push(fruit);
  },
  DELETE_FRUIT(state, id) {
    const idx = state.fruits.findIndex((fruit) => fruit.id === id);
    if (idx !== -1) state.fruits.splice(idx, 1);
  },
};

export const actions = {
  async fetchFruits({ commit }) {
    const { data: fruits } = await $api.all();
    const normalizedFruits = await normalizeFruits(fruits);
    commit("SET_FRUITS", [...normalizedFruits, ...fruits.data.more]);
  },
  async showFruit({ getters }, { id }) {
    const fruit = getters.fruits.find((fruit) => fruit.id === id);
    if (fruit) return fruit;

    const { data } = await $api.show(id);
    return data;
  },
  async addFruit({ commit }, fruit) {
    const { data } = await $api.store(fruit);
    commit("ADD_FRUIT", data);
  },
  async deleteFruit({ commit }, { id }) {
    await $api.delete(id);
    commit("DELETE_FRUIT", id);
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
  getters,
  mutations,
  actions,
});
