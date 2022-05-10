<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <RadioButton
            v-for="item in sauces"
            :key="item.id"
            :value="sauceNameToValue.get(item.name)"
            :text="item.name"
            name="sauce"
            :isSelected="
              selectedSauce.value === sauceNameToValue.get(item.name)
            "
            @radioChange="$emit('sauceChange', { value: $event, id: item.id })"
          >
          </RadioButton>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <ItemCounter
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              :item="ingredient"
              :isDraggable="
                customIngredients[ingredient.id].count < MAX_INGREDIENTS
              "
              :count="customIngredients[ingredient.id].count"
              @countInc="
                $emit('ingredientAdd', { id: ingredient.id, count: $event })
              "
              @countDec="
                $emit('ingredientDec', { id: ingredient.id, count: $event })
              "
              @countChange="
                $emit('ingredientCountChange', {
                  id: ingredient.id,
                  count: $event,
                })
              "
            >
            </ItemCounter>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import ItemCounter from "@/common/components/ItemCounter";
import { MAX_INGREDIENTS } from "@/common/const";
import { sauceNameToValue } from "@/common/enums";

export default {
  name: "BuilderIngredientsSelector",

  props: {
    sauces: {
      type: Array,
      required: true,
    },
    selectedSauce: {
      type: Object,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    customIngredients: {
      type: Object,
      required: true,
    },
  },

  components: {
    RadioButton,
    ItemCounter,
  },

  data() {
    return {
      MAX_INGREDIENTS,
      sauceNameToValue,
    };
  },

  methods: {
    ingredientChange(evt, value, id) {
      this.$emit("ingredientChange", value, id);
    },
  },
};
</script>
<style lang="sss" scoped></style>
