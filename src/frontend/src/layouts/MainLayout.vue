<template>
  <div class="main-layout">
    <EventListener @add-to-cart="$emit('add-to-cart', $event)">
      <slot />
    </EventListener>
  </div>
</template>

<script>
import EventListener from "../common/components/EventListener.vue";

export default {
  name: "MainLayout",

  components: { EventListener },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/page-layout";
.main-layout {
  @include page-layout;
}
</style>
