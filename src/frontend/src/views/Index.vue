<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector />

        <BuilderSizeSelector />

        <BuilderIngredientsSelector />

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
              @input="changePizzaName"
            />
          </label>

          <BuilderPizzaView />

          <BuilderPriceCounter />
        </div>
      </div>
    </form>
    <router-view @log-in="$emit('log-in', $event)" />
  </main>
</template>

<script>
import BuilderDoughSelector from "../modules/builder/components/BuilderDoughSelector";
import BuilderIngredientsSelector from "../modules/builder/components/BuilderIngredientsSelector";
import BuilderSizeSelector from "../modules/builder/components/BuilderSizeSelector";
import BuilderPizzaView from "../modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "../modules/builder/components/BuilderPriceCounter";
import { mapState } from "vuex";

export default {
  name: "Index",

  components: {
    BuilderDoughSelector,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },

  computed: {
    ...mapState("Builder", ["foundation", "ingredients", "name", "price"]),
  },

  methods: {
    changePizzaName(evt) {
      this.$store.dispatch("Builder/changeName", evt.target.value);
    },
  },
};
</script>
<style lang="scss" scoped></style>
