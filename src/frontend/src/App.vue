<template>
  <div id="app">
    <AppHeader :userData="userData" :pizza="pizza" :price="price" />
    <component
      :is="layout"
      @add-to-cart="
        price = $event.price;
        pizza = $event.pizza;
      "
      :userData="userData"
    >
      <router-view @log-in="userData = $event"></router-view>
    </component>
  </div>
</template>

<script>
import AppLayout from "./layouts/AppLayout";
import UserLayout from "./layouts/UserLayout";
import AppHeader from "./common/components/AppHeader.vue";
import { DEFAULT_LAYOUT } from "./common/const";
export default {
  name: "App",

  components: {
    AppLayout,
    UserLayout,
    AppHeader,
  },

  data() {
    return {
      userData: null,
      price: 0,
      pizza: {},
    };
  },

  computed: {
    layout() {
      return this.$route.meta.layout || DEFAULT_LAYOUT;
    },
    isSuccess() {
      return false;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
@import "~@/assets/scss/blocks/fogging";
</style>
