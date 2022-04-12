<template>
  <body>
    <AppLayout />
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
          <BuilderDoughSelector :dough="dough" @doughChange="doughChange" />

          <BuilderSizeSelector :sizes="sizes" @sizeChange="sizeChange" />

          <BuilderIngredientsSelector
            :sauces="sauces"
            :ingredients="pizza.ingredients"
            @ingredientChange="ingredientChange"
            @sauceChange="sauceChange"
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

            <BuilderPizzaView />

            <BuilderPriceCounter :price="0" />
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
import { getIngredient } from "../common/helpers";
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
      pizza: getIngredient(pizza),
      misc,
      sauces,
      dough,
      sizes,
      customPizza: {
        size: "",
        sauce: "",
        dough: "",
        ingredient: {},
      },
    };
  },

  methods: {
    ingredientChange({ id, count }) {
      this.customPizza.ingredient[id] = count;
    },
    doughChange(value) {
      this.customPizza.dough = value;
    },
    sauceChange(sauce) {
      this.customPizza.sauce = sauce;
    },
    sizeChange(size) {
      this.customPizza.size = size;
    },
  },
};
</script>
<style lang="scss" scoped></style>
