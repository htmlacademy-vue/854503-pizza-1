<template>
  <label class="radio ingredients__input">
    <input
      :name="name"
      :value="value"
      :checked="isSelected"
      type="radio"
      @input="$emit('radioChange', $event)"
    />
    <span>{{ text }}</span>
  </label>
</template>

<script>
export default {
  name: "RadioButton",

  props: {
    value: {
      type: String,
      required: true,
    },
    text: {
      type: String,
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
