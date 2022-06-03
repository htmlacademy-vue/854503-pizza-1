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
      <slot />
    </main>
  </div>
</template>

<script>
export default {
  name: "UserLayout",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/page-layout";
.user-layout {
  @include page-layout;
}
</style>
