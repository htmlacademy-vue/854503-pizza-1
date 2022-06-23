<template>
  <div :class="`counter ${block}__counter`">
    <button
      :disabled="count === MIN_VALUE"
      type="button"
      class="counter__button counter__button--minus"
      @click="countChange(count - 1)"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      :value="count"
      type="text"
      name="counter"
      class="counter__input"
      @change="countChange($event.target.value)"
    />
    <button
      :class="[
        'counter__button',
        'counter__button--plus',
        color ? `counter__button--${color}` : '',
      ]"
      :disabled="!maxValue ? false : count >= maxValue"
      type="button"
      @click="countChange(count + 1)"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { MIN_VALUE } from "../const";

export default {
  name: "ItemCounter",

  props: {
    color: {
      type: String,
      required: false,
    },
    id: {
      type: Number,
      default: null,
    },
    name: {
      type: String,
      default: "",
    },
    block: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      MIN_VALUE,
    };
  },
  methods: {
    countChange(value) {
      this.$emit("countChange", Number.parseInt(value, 10));
    },
  },
};
</script>
<style lang="scss" scoped></style>
