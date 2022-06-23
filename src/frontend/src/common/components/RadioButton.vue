<template>
  <label class="radio ingredients__input">
    <input
      :name="name"
      :value="value"
      :checked="isSelected"
      type="radio"
      @input="radioChange"
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
    storeAction: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },

  methods: {
    radioChange(evt) {
      this.$store.dispatch(this.storeAction, {
        id: this.id,
        value: evt.target.value,
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
