<template>
  <label :class="`${name}__input ${name}__input--${item.value}`">
    <input
      type="radio"
      :name="name"
      :value="item.value"
      :checked="isSelected"
      class="visually-hidden"
      @input="$emit('selectorChange', $event.target.value)"
    />
    <b v-if="name === 'dough'">{{ item.title }}</b>
    <span v-else>{{ item.title }}</span>
    <span v-if="item.text">{{ item.text }}</span>
  </label>
</template>

<script>
export default {
  name: "SelectorItem",

  props: {
    item: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped></style>
