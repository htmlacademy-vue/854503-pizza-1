<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <RadioButton
            v-for="item in jsonPizza.sauces"
            :key="item.id"
            :value="sauceNameToValue.get(item.name)"
            :text="item.name"
            :id="item.id"
            name="sauce"
            :isSelected="foundation.sauce.id === item.id"
            storeAction="Builder/sauceChange"
          >
          </RadioButton>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <ItemCounter
              v-for="ingredient in jsonPizza.ingredients"
              :key="ingredient.id"
              :item="ingredient"
              :isDraggable="ingredients[ingredient.id].count < MAX_INGREDIENTS"
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
import { mapState } from "vuex";

export default {
  name: "BuilderIngredientsSelector",

  data() {
    return {
      MAX_INGREDIENTS,
      sauceNameToValue,
    };
  },

  components: {
    RadioButton,
    ItemCounter,
  },

  computed: {
    ...mapState("Builder", ["foundation", "ingredients", "jsonPizza"]),
  },
};
</script>
