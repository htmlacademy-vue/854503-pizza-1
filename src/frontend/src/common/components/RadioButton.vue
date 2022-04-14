<template>
  <label class="radio ingredients__input">
    <input
      type="radio"
      :name="name"
      :value="item.value"
      :checked="isSelected"
      @input="$emit('radioChange', $event.target.value)"
    />
    <span>{{ item.text }}</span>
  </label>
</template>

<script>
export default {
  name: "RadioButton",

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
