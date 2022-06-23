<template>
  <div class="user-layout">
    <main class="layout">
      <div class="layout__sidebar sidebar">
        <router-link :to="{ name: 'Index' }" class="logo layout__logo">
          <img
            src="img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </router-link>

        <router-link
          :to="{
            name: 'Orders',
          }"
          active-class="layout__link--active"
          class="layout__link"
          >История заказов</router-link
        >
        <router-link
          :to="{
            name: 'Profile',
          }"
          active-class="layout__link--active"
          class="layout__link"
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
