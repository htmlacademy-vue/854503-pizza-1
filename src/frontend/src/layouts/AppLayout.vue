<template>
  <div class="app-layout">
    <EventListener @add-to-cart="$emit('add-to-cart', $event)">
      <slot></slot>
    </EventListener>
  </div>
</template>

<script>
import EventListener from "../common/components/EventListener.vue";

export default {
  name: "AppLayout",

  components: { EventListener },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/page-layout";
.app-layout {
  @include page-layout;
}
</style>
