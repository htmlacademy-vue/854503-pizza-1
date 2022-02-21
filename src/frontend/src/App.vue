<template>
  <div id="app">
    <IndexPage />
  </div>
</template>

<script>
import IndexPage from "../src/views/Index";
export default {
  name: "App",
  components: {
    IndexPage,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>

// make start_project
