import { ADD_ENTITY } from "@/store/mutations-types";
import { cloneDeep } from "lodash";

const module = "Cart";
const namespace = (entity) => ({
  module,
  entity,
});

const state = () => ({
  pizza: [],
  misc: [],
});

export default {
  namespaced: true,
  state: state(),

  actions: {
    addPizzaToCart({ commit, rootState }) {
      const processedData = cloneDeep(rootState.Builder);

      delete processedData.jsonPizza;

      commit(
        ADD_ENTITY,
        {
          ...namespace("pizza"),
          value: processedData,
        },
        { root: true }
      );
    },
  },

  getters: {
    getCartPrice(state) {
      return state.pizza.reduce((prev, cur) => prev + cur.price, 0);
    },
  },
};
