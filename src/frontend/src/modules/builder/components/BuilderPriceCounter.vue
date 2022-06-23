<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button
      :disabled="isDisabled"
      type="button"
      class="button"
      @click="addToCart"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BuilderPriceCounter",

  computed: {
    ...mapState("Builder", ["ingredients", "name", "price"]),

    isDisabled() {
      const ingredients = this.ingredients;
      let isAnyAdded = true;

      for (let ingredient in ingredients) {
        if (ingredients[ingredient].count > 0) {
          isAnyAdded = this.name ? false : true;
          break;
        }
      }
      return isAnyAdded;
    },
  },

  methods: {
    addToCart() {
      this.$store.dispatch("Cart/addPizzaToCart");
    },
  },
};
</script>
<style lang="scss" scoped></style>
