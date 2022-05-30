<template>
  <label class="input">
    <span>{{ title }}</span>
    <input
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      :required="isRequired"
      @input="$emit('input', $event.target.value)"
    />
  </label>
</template>

<script>
export default {
  name: "AppInput",

  model: {
    props: "value",
    event: "input",
  },

  props: {
    type: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    value: {
      type: [String, Number],
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      require: true,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
