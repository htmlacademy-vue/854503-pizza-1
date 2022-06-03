import { ADD_ENTITY } from "@/store/mutations-types";

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
      const processedData = rootState.Builder;

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
};
