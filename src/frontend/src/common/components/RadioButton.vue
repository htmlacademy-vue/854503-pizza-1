<template>
  <label class="radio ingredients__input">
    <input
      type="radio"
      :name="name"
      :value="item.value"
      :checked="item.isChecked"
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
  },
};
</script>
<style lang="scss" scoped></style>
