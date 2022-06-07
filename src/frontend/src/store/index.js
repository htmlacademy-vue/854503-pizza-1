import Vue from "vue";
import Vuex from "vuex";
import { uniqueId } from "lodash";
import VuexPlugins from "@/plugins/vuexPlugins";
import modules from "@/store/modules";
import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY_ARRAY,
  UPDATE_ENTITY_OBJECT,
  DELETE_ENTITY,
} from "@/store/mutations-types";
import { MESSAGE_LIVE_TIME } from "@/common/const";
import jsonUser from "@/static/user.json";

Vue.use(Vuex);

const state = () => ({
  notifications: [],
});

export default new Vuex.Store({
  state: state(),
  getters: {},
  mutations: {
    [ADD_NOTIFICATION](state, notification) {
      state.notifications = [...state.notifications, notification];
    },

    [DELETE_NOTIFICATION](state, id) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== id
      );
    },

    [SET_ENTITY](state, { module, entity, value }) {
      module ? (state[module][entity] = value) : (state[entity] = value);
    },

    [ADD_ENTITY](state, { module, entity, value }) {
      if (module) {
        state[module][entity] = [...state[module][entity], value];
      } else {
        state[entity] = [...state[entity], value];
      }
    },

    [DELETE_ENTITY](state, { module, entity, id }) {
      if (module) {
        state[module][entity] = state[module][entity].filter(
          (e) => +e.id !== +id
        );
      } else {
        state[entity] = state[entity].filter((e) => +e.id !== +id);
      }
    },

    [UPDATE_ENTITY_ARRAY](state, { module, entity, value }) {
      if (module) {
        const index = state[module][entity].findIndex(
          ({ id }) => id === value.id
        );

        if (~index) {
          state[module][entity].splice(index, 1, value);
        }
      } else {
        const index = state[entity].findIndex(({ id }) => id === value.id);

        if (~index) {
          state[entity.splice(index, 1, value)];
        }
      }
    },

    [UPDATE_ENTITY_OBJECT](state, { module, entity, value }) {
      if (module) {
        if (state[module].hasOwnProperty(entity)) {
          state[module][entity] = value;
        }
      } else {
        if (state.hasOwnProperty(entity)) {
          state[entity] = value;
        }
      }
    },
  },
  actions: {
    fetchUser(ctx) {
      const user = jsonUser;

      ctx.commit(SET_ENTITY, {
        module: null,
        entity: "user",
        value: user,
      });
    },

    async init(ctx) {
      ctx.dispatch("fetchUser");
      ctx.dispatch("Cart/fetchMisc");
    },

    async createNotification(ctx, { ...notification }) {
      const newNotification = {
        ...notification,
        id: uniqueId(),
      };

      ctx.commit(ADD_NOTIFICATION, newNotification);

      setTimeout(
        () => ctx.commit(DELETE_NOTIFICATION, newNotification),
        MESSAGE_LIVE_TIME
      );
    },
  },
  plugins: [VuexPlugins],
  modules,
});
