<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="isDisabled"
      @click="$emit('addToCart')"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",

  props: {
    price: {
      type: Number,
      default: 0,
    },
    isDisabled: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style lang="scss" scoped></style>
