<template>
  <label class="radio ingredients__input">
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="isSelected"
      @input="$emit('radioChange', $event.target.value)"
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
