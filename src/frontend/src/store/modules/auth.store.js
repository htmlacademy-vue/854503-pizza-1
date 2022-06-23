import { SET_ENTITY } from "@/store/mutations-types";
import jsonUser from "@/static/user.json";

const module = "Auth";
const namespace = (entity) => ({ module, entity });

const state = () => ({});

export default {
  namespaced: true,
  state: state(),

  actions: {
    fetchUser({ commit }) {
      const user = jsonUser;
      commit(
        SET_ENTITY,
        {
          ...namespace("user"),
          value: user,
        },
        { root: true }
      );
    },
  },
};
