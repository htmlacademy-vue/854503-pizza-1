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
            :item="item"
            name="sauce"
            @radioChange="$emit('sauceChange', $event)"
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
              @countChange="$emit('ingredientChange', $event)"
            >
            </ItemCounter>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "../../../common/components/RadioButton";
import ItemCounter from "../../../common/components/ItemCounter";

export default {
  name: "BuilderIngredientsSelector",

  props: {
    sauces: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
  },

  components: {
    RadioButton,
    ItemCounter,
  },

  methods: {
    ingredientChange(evt, value, id) {
      this.$emit("ingredientChange", value, id);
    },
  },
};
</script>
<style lang="sss" scoped></style>
