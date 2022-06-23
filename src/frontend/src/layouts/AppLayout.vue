<template>
  <div class="app-layout">
    <AppHeader :userData="userData" />
    <component :is="layout" :userData="userData">
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
