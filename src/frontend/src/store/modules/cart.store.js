import {
  ADD_ENTITY,
  UPDATE_ENTITY_ARRAY,
  SET_ENTITY,
  CLEAR_STATE,
  DELETE_ENTITY,
} from "@/store/mutations-types";
import jsonMisc from "@/static/misc";
import { miscFromServerAdapter } from "@/common/helpers";
import { cloneDeep } from "lodash";

const module = "Cart";
const namespace = (entity) => ({
  module,
  entity,
});

const defaultState = () => ({
  pizza: [],
  misc: [],
  name: "",
  price: 0,
  miscFromServer: [],
});

export default {
  namespaced: true,
  state: defaultState(),

  actions: {
    fetchMisc({ commit }) {
      const misc = jsonMisc;
      const miscCopy = cloneDeep(misc).map(miscFromServerAdapter);

      commit(
        SET_ENTITY,
        {
          ...namespace("misc"),
          value: miscCopy,
        },
        { root: true }
      );
      commit(
        SET_ENTITY,
        {
          ...namespace("miscFromServer"),
          value: misc,
        },
        { root: true }
      );
    },

    changeMiscCount({ state, commit }, { id, count }) {
      const index = state.misc.findIndex((item) => item.id === id);
      const miscCopy = state.misc[index];

      if (count < 0) {
        miscCopy.count = 0;
      }

      miscCopy.count = count;

      commit(
        UPDATE_ENTITY_ARRAY,
        {
          ...namespace("misc"),
          value: miscCopy,
        },
        { root: true }
      );
    },

    changePizzaCount({ state, commit }, { id, count }) {
      const index = state.pizza.findIndex((item) => item.id === id);
      const pizzaCopy = state.pizza[index];

      if (count <= 0) {
        commit(
          DELETE_ENTITY,
          {
            ...namespace("pizza"),
            id: pizzaCopy.id,
          },
          { root: true }
        );
      } else {
        pizzaCopy.count = count;

        commit(
          UPDATE_ENTITY_ARRAY,
          {
            ...namespace("pizza"),
            value: pizzaCopy,
          },
          { root: true }
        );
      }
    },

    addPizzaToCart({ commit, state, rootState }) {
      const isOnChange = rootState.Builder.onChange;
      const index = state.pizza.findIndex(
        ({ id }) => id === rootState.Builder.id
      );
      let processedData = state.pizza[index];

      if (~index) {
        if (isOnChange) {
          processedData = cloneDeep(rootState.Builder);
        }
        processedData.count = isOnChange
          ? processedData.count
          : processedData.count + 1;

        commit(
          UPDATE_ENTITY_ARRAY,
          {
            ...namespace("pizza"),
            value: processedData,
          },
          { root: true }
        );
      } else {
        processedData = cloneDeep(rootState.Builder);
        processedData = { ...processedData, count: 1 };

        commit(
          ADD_ENTITY,
          {
            ...namespace("pizza"),
            value: processedData,
          },
          { root: true }
        );
      }

      commit(`Builder/${CLEAR_STATE}`, null, { root: true });
    },

    clearCart({ state, commit }) {
      let miscCopy = cloneDeep(state.miscFromServer);

      commit(CLEAR_STATE);
      commit(
        SET_ENTITY,
        {
          ...namespace("miscFromServer"),
          value: miscCopy,
        },
        { root: true }
      );
      commit(
        SET_ENTITY,
        {
          ...namespace("misc"),
          value: miscCopy.map(miscFromServerAdapter),
        },
        { root: true }
      );
    },
  },

  mutations: {
    [CLEAR_STATE]() {
      this.state.Cart = defaultState();
    },
  },

  getters: {
    getCartPrice(state) {
      const pizzaPrice = state.pizza.reduce(
        (prev, cur) => prev + cur.price * cur.count,
        0
      );
      const miscPrice = state.misc.reduce(
        (prev, cur) => prev + cur.price * cur.count,
        0
      );

      return pizzaPrice + miscPrice;
    },
  },
};
