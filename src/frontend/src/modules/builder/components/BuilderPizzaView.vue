<template>
  <AppDrop @drop="addIngredient">
    <div class="content__constructor">
      <div
        :class="`pizza pizza--foundation--${doughToClass.get(
          foundation.dough.value
        )}-${foundation.sauce.value}`"
      >
        <div class="pizza__wrapper">
          <div
            v-for="ingredient in addedIngredients"
            :key="ingredient.ingredientName + ingredient.count"
            class="pizza__filling"
            :class="[
              `pizza__filling--${ingredient.ingredientName}`,
              { 'pizza__filling--second': ingredient.count === 2 },
              { 'pizza__filling--third': ingredient.count === 3 },
            ]"
          ></div>
        </div>
      </div>
    </div>
  </AppDrop>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import { doughToClass } from "@/common/enums";
import { mapState } from "vuex";

export default {
  name: "BuilderPizzaView",

  components: {
    AppDrop,
  },

  data() {
    return {
      doughToClass,
    };
  },

  computed: {
    ...mapState("Builder", ["ingredients", "foundation"]),

    addedIngredients() {
      let ingredientsList = [];

      for (let ingredient in this.ingredients) {
        const currentIngredient = this.ingredients[ingredient];

        for (let index = 1; index <= currentIngredient.count; index++) {
          let cloneIngredient = Object.assign({}, currentIngredient);
          cloneIngredient.count = index;
          ingredientsList.push(cloneIngredient);
        }
      }
      return ingredientsList;
    },
  },

  methods: {
    addIngredient(id) {
      this.$store.dispatch("Builder/changeIngredientCount", {
        id,
        increaseByOne: true,
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
