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
    count: {
      type: Number,
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

  methods: {
    countChange(value) {
      let currentCount = Number.parseInt(value, 10);

      if (currentCount < MIN_INGREDIENTS || Number.isNaN(currentCount)) {
        currentCount = 0;
      }
      if (currentCount > MAX_INGREDIENTS) {
        currentCount = MAX_INGREDIENTS;
      }

      this.$emit("countChange", currentCount);
    },
  },
};
</script>
<style lang="scss" scoped></style>
