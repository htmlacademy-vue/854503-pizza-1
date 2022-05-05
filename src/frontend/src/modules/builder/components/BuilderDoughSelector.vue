<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <SelectorItem
          v-for="item in dough"
          :key="item.id"
          :item="item"
          :isSelected="selectedDough.value === item.value"
          name="dough"
          @selectorChange="$emit('doughChange', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SelectorItem from "@/common/components/SelectorItem.vue";

export default {
  name: "BuilderDoughSelector",

  props: {
    dough: {
      type: Array,
      required: true,
    },
    selectedDough: {
      type: Object,
      required: true,
    },
  },

  components: {
    SelectorItem,
  },
};
</script>
<style lang="scss" scoped></style>
