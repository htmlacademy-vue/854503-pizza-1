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
            :isSelected="foundation.sauce.id === item.id"
            name="sauce"
            @radioChange="
              radioChange({ id: item.id, value: $event.target.value })
            "
          >
          </RadioButton>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <BuilderIngredientCounter
              v-for="{ id, ingredientName, name } in jsonPizza.ingredients"
              :key="id"
              :id="id"
              :ingredientName="ingredientName"
              :name="name"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import BuilderIngredientCounter from "./BuilderIngredientCounter.vue";
import { sauceNameToValue } from "@/common/enums";
import { mapState } from "vuex";

export default {
  name: "BuilderIngredientsSelector",

  data() {
    return {
      sauceNameToValue,
    };
  },

  components: {
    RadioButton,
    BuilderIngredientCounter,
  },

  computed: {
    ...mapState("Builder", ["foundation", "ingredients", "jsonPizza"]),
  },

  methods: {
    radioChange({ id, value }) {
      this.$store.dispatch("Builder/sauceChange", {
        id,
        value,
      });
    },
  },
};
</script>
