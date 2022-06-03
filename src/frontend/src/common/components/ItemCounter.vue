<template>
  <li class="ingredients__item">
    <AppDrop @drop="$emit('drop', $event)">
      <AppDrag :transferData="item" :isDraggable="isDraggable">
        <span class="filling" :class="`filling--${item.ingredientName}`">
          {{ item.name }}
        </span>

        <div class="counter counter--orange ingredients__counter">
          <button
            type="button"
            class="counter__button counter__button--minus"
            :disabled="count === MIN_INGREDIENTS"
            @click="countChange(count - 1)"
          >
            <span class="visually-hidden">Меньше</span>
          </button>
          <input
            type="text"
            name="counter"
            class="counter__input"
            :value="count"
            @change="countChange($event.target.value)"
          />
          <button
            type="button"
            class="counter__button counter__button--plus"
            :disabled="count >= MAX_INGREDIENTS"
            @click="countChange(count + 1)"
          >
            <span class="visually-hidden">Больше</span>
          </button>
        </div>
      </AppDrag>
    </AppDrop>
  </li>
</template>

<script>
import { mapGetters } from "vuex";
import { MAX_INGREDIENTS, MIN_INGREDIENTS } from "../const";
import AppDrag from "./AppDrag";
import AppDrop from "./AppDrop";

export default {
  name: "ItemCounter",

  components: {
    AppDrag,
    AppDrop,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
    isDraggable: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      MAX_INGREDIENTS,
      MIN_INGREDIENTS,
    };
  },

  computed: {
    ...mapGetters("Builder", ["getIngredientCount"]),

    count() {
      return this.getIngredientCount(this.item.id);
    },
  },

  methods: {
    countChange(value) {
      this.$store.dispatch("Builder/changeIngredientAmount", {
        id: this.item.id,
        count: value,
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
