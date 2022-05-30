<template>
  <div class="user-layout">
    <main class="layout">
      <div class="layout__sidebar sidebar">
        <router-link to="/" class="logo layout__logo">
          <img
            src="img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </router-link>

        <router-link
          active-class="layout__link--active"
          class="layout__link"
          to="/orders"
          >История заказов</router-link
        >
        <router-link
          active-class="layout__link--active"
          class="layout__link"
          to="/profile"
          >Мои данные</router-link
        >
      </div>
      <EventListener @add-to-cart="$emit('add-to-cart', $event)">
        <slot />
      </EventListener>
    </main>
  </div>
</template>

<script>
import EventListener from "../common/components/EventListener.vue";

export default {
  name: "UserLayout",
  components: {
    EventListener,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/page-layout";
.user-layout {
  @include page-layout;
}
</style>
