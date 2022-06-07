<template>
  <div :class="`counter ${block}__counter`">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="count === MIN_VALUE"
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
      :class="[
        'counter__button',
        'counter__button--plus',
        color ? `counter__button--${color}` : '',
      ]"
      :disabled="!maxValue ? false : count >= maxValue"
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
    storeModule: {
      type: String,
      required: true,
    },
    storeAction: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      MIN_VALUE,
    };
  },
  methods: {
    countChange(value) {
      this.$store.dispatch(`${this.storeModule}/${this.storeAction}`, {
        id: this.id,
        count: value,
        name: this.name,
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
