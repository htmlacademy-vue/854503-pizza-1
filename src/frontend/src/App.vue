<template>
  <div id="app">
    <AppLayout />
  </div>
</template>

<script>
import AppLayout from "./layouts/AppLayout";
import { mapState } from "vuex";

export default {
  name: "App",

  components: {
    AppLayout,
  },

  computed: mapState(["notifications"]),

  created() {
    this.$store.dispatch("init");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
@import "~@/assets/scss/blocks/fogging";
</style>
