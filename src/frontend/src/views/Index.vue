<template>
  <body>
    <AppLayout :price="cart.price" :pizza="cart.pizza" />
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
          <BuilderDoughSelector
            :dough="pizza.dough"
            :selectedDough="customPizza.dough.value"
            @doughChange="doughChange"
          />

          <BuilderSizeSelector
            :sizes="pizza.sizes"
            :selectedSize="customPizza.size"
            @sizeChange="sizeChange"
          />

          <BuilderIngredientsSelector
            :sauces="pizza.sauces"
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
                @change="customPizza.name = $event.target.value"
              />
            </label>

            <BuilderPizzaView
              @addIngredient="addIngredient"
              :ingredients="customPizza.ingredients"
              :dough="customPizza.dough.value"
              :souce="customPizza.sauce.value"
            />

            <BuilderPriceCounter
              :price="price"
              :isDisabled="isIngredientAdded"
              @addToCart="addToCart"
            />
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
  makeIngredientsList,
  getDefaultPizza,
  findItemById,
} from "../common/helpers";
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
      pizza: {
        dough: pizza.dough,
        sauces: pizza.sauces,
        sizes: pizza.sizes,
        ingredients: getIngredients(pizza),
      },
      misc,
      customPizza: Object.assign({}, getDefaultPizza(pizza), {
        ingredients: makeIngredientsList(pizza.ingredients),
        name: "",
      }),
      cart: {},
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
    isIngredientAdded() {
      const ingredients = this.customPizza.ingredients;
      let isAnyAdded = true;

      for (let ingredient in ingredients) {
        if (ingredients[ingredient].count > 0) {
          isAnyAdded = this.customPizza.name ? false : true;
          break;
        }
      }
      return isAnyAdded;
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
    doughChange({ value, id }) {
      this.customPizza.dough = {
        value,
        price: findItemById(this.pizza.dough, id).price,
      };
    },
    sauceChange({ value, id }) {
      this.customPizza.sauce = {
        value,
        price: findItemById(this.pizza.sauces, id).price,
      };
    },
    sizeChange({ value, id }) {
      this.customPizza.size = {
        value,
        multiplier: findItemById(this.pizza.sizes, id).multiplier,
      };
    },
    addToCart() {
      this.cart = {
        pizza: this.customPizza,
        price: this.price,
      };
    },
  },
};
</script>
<style lang="scss" scoped></style>
