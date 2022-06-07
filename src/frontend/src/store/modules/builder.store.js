import {
  makeIngredientsList,
  getIngredients,
  getDefaultPizza,
  findItemById,
} from "@/common/helpers";
import jsonPizza from "@/static/pizza";
import {
  UPDATE_ENTITY_OBJECT,
  CLEAR_STATE,
  SET_PIZZA_TO_CHANGE,
} from "@/store/mutations-types";
import { MAX_VALUE, MIN_VALUE } from "@/common/const";
import { cloneDeep, uniqueId } from "lodash";

const module = "Builder";
const namespace = (entity) => ({ module, entity });

const state = () => ({
  foundation: getDefaultPizza(jsonPizza),
  ingredients: makeIngredientsList(getIngredients(jsonPizza)),
  name: "",
  price: 0,
  id: Number.parseInt(uniqueId(), 10),
  jsonPizza,
  onChange: false,
});

export default {
  namespaced: true,
  state: state(),

  actions: {
    changeIngredientCount(ctx, { id, count, increaseByOne }) {
      const newIngredients = Object.assign({}, ctx.state.ingredients);
      let newCount = increaseByOne
        ? newIngredients[id].count + 1
        : Number.parseInt(count, 10);

      if (newCount < MIN_VALUE || Number.isNaN(newCount)) {
        newCount = 0;
      }
      if (newCount > MAX_VALUE) {
        newCount = MAX_VALUE;
      }

      newIngredients[id].count = newCount;

      ctx.commit(
        UPDATE_ENTITY_OBJECT,
        {
          ...namespace("ingredients"),
          value: newIngredients,
        },
        { root: true }
      );

      ctx.dispatch("changePrice");
    },

    doughChange({ state, commit, dispatch }, { value, id }) {
      let newDough = Object.assign({}, state.foundation.dough);
      const foundationClone = cloneDeep(state.foundation);

      newDough = {
        ...newDough,
        value,
        price: findItemById(state.jsonPizza.dough, id).price,
        id,
      };

      foundationClone.dough = newDough;

      commit(
        UPDATE_ENTITY_OBJECT,
        {
          ...namespace("foundation"),
          value: foundationClone,
        },
        { root: true }
      );

      dispatch("changePrice");
    },

    sauceChange(ctx, { value, id }) {
      let newSauce = Object.assign({}, ctx.state.foundation.sauce);
      const foundationClone = cloneDeep(ctx.state.foundation);

      newSauce = {
        ...newSauce,
        value,
        price: findItemById(ctx.state.jsonPizza.sauces, id).price,
        name: findItemById(ctx.state.jsonPizza.sauces, id).name,
        id,
      };

      foundationClone.sauce = newSauce;

      ctx.commit(
        UPDATE_ENTITY_OBJECT,
        {
          ...namespace("foundation"),
          value: foundationClone,
        },
        { root: true }
      );

      ctx.dispatch("changePrice");
    },

    sizeChange(ctx, { value, id }) {
      let newSize = Object.assign({}, ctx.state.foundation.size);
      const foundationClone = cloneDeep(ctx.state.foundation);

      newSize = {
        ...newSize,
        value,
        multiplier: findItemById(ctx.state.jsonPizza.sizes, id).multiplier,
        name: findItemById(ctx.state.jsonPizza.sizes, id).name,
        id,
      };

      foundationClone.size = newSize;

      ctx.commit(
        UPDATE_ENTITY_OBJECT,
        {
          ...namespace("foundation"),
          value: foundationClone,
        },
        { root: true }
      );

      ctx.dispatch("changePrice");
    },

    changePrice(ctx) {
      const saucePrice = ctx.state.foundation.sauce.price;
      const doughPrice = ctx.state.foundation.dough.price;
      const ingredients = ctx.state.ingredients;
      let currentPrice = saucePrice + doughPrice;

      for (let ingredient in ingredients) {
        const item = findItemById(jsonPizza.ingredients, ingredient);
        currentPrice += item.price * ingredients[ingredient].count;
      }

      currentPrice = currentPrice * ctx.state.foundation.size.multiplier;
      ctx.commit(
        UPDATE_ENTITY_OBJECT,
        {
          ...namespace("price"),
          value: currentPrice,
        },
        { root: true }
      );
    },

    changeName(ctx, name) {
      ctx.commit(
        UPDATE_ENTITY_OBJECT,
        {
          ...namespace("name"),
          value: name,
        },
        { root: true }
      );
    },
  },

  getters: {
    getIngredientCount: (state) => (id) => {
      return state.ingredients[id].count;
    },
  },

  mutations: {
    [CLEAR_STATE]() {
      this.state.Builder = state();
    },

    [SET_PIZZA_TO_CHANGE](state, pizza) {
      this.state.Builder = { ...pizza, jsonPizza, onChange: true };
    },
  },
};
