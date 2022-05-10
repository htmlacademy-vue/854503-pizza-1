<template>
  <AppDrop @drop="$emit('addIngredient', $event)">
    <div class="content__constructor">
      <div
        :class="`pizza pizza--foundation--${doughToClass.get(dough)}-${souce}`"
      >
        <div class="pizza__wrapper">
          <div
            v-for="ingredient in addedIngredients.addedOnce"
            :key="`${ingredient}-once`"
            class="pizza__filling"
            :class="`pizza__filling--${ingredient}`"
          ></div>
          <div
            v-for="ingredient in addedIngredients.addedTwice"
            :key="`${ingredient}-twice`"
            class="pizza__filling"
            :class="`pizza__filling--${ingredient} pizza__filling--second`"
          ></div>
          <div
            v-for="ingredient in addedIngredients.addedThrice"
            :key="`${ingredient}-thrice`"
            class="pizza__filling"
            :class="`pizza__filling--${ingredient} pizza__filling--third`"
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
      const sortedIngredient = {
        addedOnce: [],
        addedTwice: [],
        addedThrice: [],
      };

      for (let ingredient in this.ingredients) {
        switch (this.ingredients[ingredient].count) {
          case 1: {
            sortedIngredient.addedOnce.push(
              this.ingredients[ingredient].ingredientName
            );
            break;
          }
          case 2: {
            sortedIngredient.addedOnce.push(
              this.ingredients[ingredient].ingredientName
            );
            sortedIngredient.addedTwice.push(
              this.ingredients[ingredient].ingredientName
            );
            break;
          }
          case 3: {
            sortedIngredient.addedOnce.push(
              this.ingredients[ingredient].ingredientName
            );
            sortedIngredient.addedTwice.push(
              this.ingredients[ingredient].ingredientName
            );
            sortedIngredient.addedThrice.push(
              this.ingredients[ingredient].ingredientName
            );
          }
        }
      }

      return sortedIngredient;
    },
  },
};
</script>
<style lang="scss" scoped></style>
