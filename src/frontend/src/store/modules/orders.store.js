import { cloneDeep } from "lodash";
import { ADD_ENTITY } from "@/store/mutations-types";

const module = "Orders";
const namespace = (entity) => ({ module, entity });

const state = () => ({
  orders: [],
});

export default {
  namespaced: true,
  state: state(),

  actions: {
    addOrder({ commit, rootState }) {
      const cartCopy = cloneDeep(rootState.Cart);
      delete cartCopy.miscFromServer;

      commit(
        ADD_ENTITY,
        {
          ...namespace("orders"),
          value: cartCopy,
        },
        { root: true }
      );
    },
  },
};
