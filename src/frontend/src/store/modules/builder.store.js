import {
  makeIngredientsList,
  getIngredients,
  getDefaultPizza,
  findItemById,
} from "@/common/helpers";
import jsonPizza from "@/static/pizza";
import { UPDATE_ENTITY } from "@/store/mutations-types";
import { MAX_INGREDIENTS, MIN_INGREDIENTS } from "@/common/const";
import { cloneDeep } from "lodash";

const module = "Builder";
const namespace = (entity) => ({ module, entity });

const state = () => ({
  foundation: getDefaultPizza(jsonPizza),
  ingredients,
  name: "",
  price: 0,
  jsonPizza,
});

const ingredients = makeIngredientsList(getIngredients(jsonPizza));

export default {
  namespaced: true,
  state: state(),

  actions: {
    changeIngredientAmount(ctx, { id, count }) {
      const newIngredients = Object.assign({}, ctx.state.ingredients);
      let newCount = Number.parseInt(count, 10);

      if (newCount < MIN_INGREDIENTS || Number.isNaN(newCount)) {
        newCount = 0;
      }
      if (newCount > MAX_INGREDIENTS) {
        newCount = MAX_INGREDIENTS;
      }

      newIngredients[id].count = count;

      ctx.commit(
        UPDATE_ENTITY,
        {
          ...namespace("ingredients"),
          value: newIngredients,
        },
        { root: true }
      );

      ctx.dispatch("changePrice");
    },

    doughChange(ctx, { value, id }) {
      let newDough = Object.assign({}, ctx.state.foundation.dough);
      const foundationClone = cloneDeep(ctx.state.foundation);

      newDough = {
        ...newDough,
        value,
        price: findItemById(ctx.state.jsonPizza.dough, id).price,
        id,
      };

      foundationClone.dough = newDough;

      ctx.commit(
        UPDATE_ENTITY,
        {
          ...namespace("foundation"),
          value: foundationClone,
        },
        { root: true }
      );

      ctx.dispatch("changePrice");
    },

    sauceChange(ctx, { value, id }) {
      let newSauce = Object.assign({}, ctx.state.foundation.sauce);
      const foundationClone = cloneDeep(ctx.state.foundation);

      newSauce = {
        ...newSauce,
        value,
        price: findItemById(ctx.state.jsonPizza.sauces, id).price,
        id,
      };

      foundationClone.sauce = newSauce;

      ctx.commit(
        UPDATE_ENTITY,
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
        id,
      };

      foundationClone.size = newSize;

      ctx.commit(
        UPDATE_ENTITY,
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
        UPDATE_ENTITY,
        {
          ...namespace("price"),
          value: currentPrice,
        },
        { root: true }
      );
    },

    changeName(ctx, name) {
      ctx.commit(
        UPDATE_ENTITY,
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

  mutations: {},
};
