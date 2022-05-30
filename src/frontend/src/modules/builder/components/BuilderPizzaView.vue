<template>
  <AppDrop @drop="$emit('addIngredient', $event)">
    <div class="content__constructor">
      <div
        :class="`pizza pizza--foundation--${doughToClass.get(dough)}-${souce}`"
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

  props: {
    ingredients: {
      type: Object,
      required: true,
    },
    dough: {
      type: String,
      required: true,
    },
    souce: {
      type: String,
      required: true,
    },
  },

  computed: {
    addedIngredients() {
      let ingredientsList = [];

      for (let a in this.ingredients) {
        const currentIngredient = this.ingredients[a];

        for (let index = 1; index <= currentIngredient.count; index++) {
          let cloneIngredient = Object.assign({}, currentIngredient);
          cloneIngredient.count = index;
          ingredientsList.push(cloneIngredient);
        }
      }
      return ingredientsList;
    },
  },
};
</script>
<style lang="scss" scoped></style>
