<template>
  <li class="ingredients__item">
    <AppDrop @drop="$emit('drop', $event)">
      <AppDrag :transferData="id" :isDraggable="count < maxIngredients">
        <span class="filling" :class="`filling--${ingredientName}`">
          {{ name }}
        </span>
      </AppDrag>
    </AppDrop>

    <ItemCounter
      :count="count"
      :maxValue="maxIngredients"
      :id="id"
      block="ingredients"
      @countChange="$countChange($event, 'Builder/changeIngredientCount')"
    />
  </li>
</template>

<script>
import AppDrag from "@/common/components/AppDrag.vue";
import AppDrop from "@/common/components/AppDrop.vue";
import ItemCounter from "@/common/components/ItemCounter.vue";
import { MAX_VALUE as maxIngredients } from "@/common/const";
import { mapGetters } from "vuex";
import countChange from "@/common/mixins/countChange";

export default {
  name: "BuilderIngredientCounter",

  components: {
    ItemCounter,
    AppDrag,
    AppDrop,
  },

  data() {
    return {
      maxIngredients,
    };
  },

  props: {
    id: {
      type: Number,
      require: true,
    },
    ingredientName: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    isDraggable: {
      type: Boolean,
      default: false,
    },
  },

  mixins: [countChange],

  computed: {
    ...mapGetters("Builder", ["getIngredientCount"]),

    count() {
      return this.getIngredientCount(this.id);
    },
  },
};
</script>
