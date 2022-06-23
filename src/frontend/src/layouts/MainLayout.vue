<template>
  <div class="main-layout">
    <slot />
  </div>
</template>

<script>
export default {
  name: "MainLayout",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/page-layout";
.main-layout {
  @include page-layout;
}
</style>
