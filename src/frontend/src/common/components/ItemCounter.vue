<template>
  <li class="ingredients__item">
    <span class="filling" :class="`filling--${item.imageName}`">
      {{ item.name }}
    </span>

    <div
      class="counter counter--orange ingredients__counter"
      @click="countChange"
    >
      <button
        type="button"
        class="counter__button counter__button--minus"
        :disabled="count === MIN_INGREDIENTS"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        type="text"
        name="counter"
        class="counter__input"
        :value="count"
        @input="countChange"
      />
      <button
        type="button"
        class="counter__button counter__button--plus"
        :disabled="count >= MAX_INGREDIENTS"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>
  </li>
</template>

<script>
import { MAX_INGREDIENTS, MIN_INGREDIENTS } from "../const";

export default {
  name: "ItemCounter",

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      count: 0,
      MAX_INGREDIENTS,
      MIN_INGREDIENTS,
    };
  },

  methods: {
    countChange(evt) {
      if (evt.target.classList.contains("counter__button--minus")) {
        --this.count;
      } else if (evt.target.classList.contains("counter__input")) {
        this.count = Number.parseInt(evt.target.value, 10);
      } else if (evt.target.classList.contains("counter__button--plus")) {
        ++this.count;
      } else {
        return;
      }

      this.$emit("countChange", { id: this.item.id, count: this.count });
    },
  },
};
</script>
<style lang="scss" scoped></style>
