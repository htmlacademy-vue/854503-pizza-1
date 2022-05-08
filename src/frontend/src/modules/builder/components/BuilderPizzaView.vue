<template>
  <AppDrop @drop="$emit('addIngredient', $event)">
    <div class="content__constructor">
      <div class="pizza pizza--foundation--big-tomato">
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

export default {
  name: "BuilderPizzaView",

  components: {
    AppDrop,
  },

  props: {
    ingredients: {
      type: Object,
      required: true,
    },
  },

  computed: {
    addedIngredients() {
      const a = {
        addedOnce: [],
        addedTwice: [],
        addedThrice: [],
      };

      for (let ingredient in this.ingredients) {
        switch (this.ingredients[ingredient].count) {
          case 1: {
            a.addedOnce.push(this.ingredients[ingredient].ingredientName);
            break;
          }
          case 2: {
            a.addedOnce.push(this.ingredients[ingredient].ingredientName);
            a.addedTwice.push(this.ingredients[ingredient].ingredientName);
            break;
          }
          case 3: {
            a.addedOnce.push(this.ingredients[ingredient].ingredientName);
            a.addedTwice.push(this.ingredients[ingredient].ingredientName);
            a.addedThrice.push(this.ingredients[ingredient].ingredientName);
          }
        }
      }

      return a;
    },
  },
};
</script>
<style lang="scss" scoped></style>
