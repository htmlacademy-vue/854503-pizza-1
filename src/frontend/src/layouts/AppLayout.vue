<template>
  <div class="app-layout">
    <AppHeader :userData="userData" :pizza="pizza" :price="price" />
    <component
      :is="layout"
      @add-to-cart="
        price = $event.price;
        pizza = $event.pizza;
      "
      :userData="userData"
    >
      <router-view @log-in="userData = $event" />
    </component>
  </div>
</template>

<script>
import UserLayout from "./UserLayout";
import AppHeader from "../common/components/AppHeader.vue";
import { DEFAULT_LAYOUT } from "../common/const";

export default {
  name: "AppLayout",

  components: {
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
      const layout = this.$route.meta.layout || DEFAULT_LAYOUT;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
