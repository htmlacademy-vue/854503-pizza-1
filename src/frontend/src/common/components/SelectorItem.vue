<template>
  <label :class="`${name}__input ${name}__input--${value}`">
    <input
      :name="name"
      :value="value"
      :checked="isSelected"
      type="radio"
      class="visually-hidden"
      @input="$emit('selectorChange', $event)"
    />
    <b v-if="name === 'dough'">{{ item.name }}</b>
    <span v-else>{{ item.name }}</span>
    <span v-if="item.description">{{ item.description }}</span>
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
    value: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped></style>
