<template>
  <body>
    <AppLayout />
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
          <BuilderDoughSelector
            :dough="dough"
            :selectedDough="customPizza.dough.value"
            @doughChange="doughChange"
          />

          <BuilderSizeSelector
            :sizes="sizes"
            :selectedSize="customPizza.size"
            @sizeChange="sizeChange"
          />

          <BuilderIngredientsSelector
            :sauces="sauces"
            :ingredients="pizza.ingredients"
            :customIngredients="customPizza.ingredients"
            :selectedSauce="customPizza.sauce"
            @sauceChange="sauceChange"
            @ingredientCountChange="ingredientAmountChange"
            @ingredientAdd="ingredientAmountChange"
            @ingredientDec="ingredientAmountChange"
          />

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
              />
            </label>

            <BuilderPizzaView
              @addIngredient="addIngredient"
              :ingredients="this.customPizza.ingredients"
            />

            <BuilderPriceCounter :price="price" />
          </div>
        </div>
      </form>
    </main>
  </body>
</template>

<script>
import pizza from "../static/pizza";
import misc from "../static/misc";
import user from "../static/user";
import {
  getIngredients,
  findItemByValue,
  makeIngredientsList,
  getDefaultPizza,
  findItemById,
} from "../common/helpers";
import { dough, sizes, sauces } from "../common/enums";
import AppLayout from "../layouts/AppLayout";
import BuilderDoughSelector from "../modules/builder/components/BuilderDoughSelector";
import BuilderIngredientsSelector from "../modules/builder/components/BuilderIngredientsSelector";
import BuilderSizeSelector from "../modules/builder/components/BuilderSizeSelector";
import BuilderPizzaView from "../modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "../modules/builder/components/BuilderPriceCounter";

export default {
  name: "IndexPage",

  components: {
    AppLayout,
    BuilderDoughSelector,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },

  data() {
    return {
      user,
      pricee: this.price,
      pizza: {
        dough: pizza.dough,
        sauces: pizza.sauces,
        sizes: pizza.sizes,
        ingredients: getIngredients(pizza),
      },
      misc,
      sauces,
      dough,
      sizes,
      customPizza: Object.assign({}, getDefaultPizza(pizza), {
        ingredients: makeIngredientsList(pizza.ingredients),
      }),
    };
  },

  computed: {
    price() {
      const saucePrice = this.customPizza.sauce.price;
      const doughPrice = this.customPizza.dough.price;
      const ingredients = this.customPizza.ingredients;
      let currentPrice = saucePrice + doughPrice;

      for (let ingredient in ingredients) {
        const item = findItemById(this.pizza.ingredients, ingredient);
        currentPrice += item.price * ingredients[ingredient].count;
      }

      return currentPrice * this.customPizza.size.multiplier;
    },
  },

  methods: {
    ingredientAmountChange({ id, count }) {
      this.customPizza.ingredients[id].count = count;
    },
    addIngredient({ id }) {
      const ingredient = this.customPizza.ingredients[id].count;

      this.customPizza.ingredients[id].count = ingredient + 1;
    },
    doughChange(value) {
      this.customPizza.dough = {
        value,
        price: findItemByValue(this.dough, value).price,
      };
    },
    sauceChange(value) {
      this.customPizza.sauce = {
        value,
        price: findItemByValue(this.sauces, value).price,
      };
    },
    sizeChange(value) {
      this.customPizza.size = {
        value,
        multiplier: findItemByValue(this.sizes, value).multiplier,
      };
    },
  },
};
</script>
<style lang="scss" scoped></style>
