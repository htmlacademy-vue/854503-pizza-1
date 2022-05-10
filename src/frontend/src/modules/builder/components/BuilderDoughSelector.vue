<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <SelectorItem
          v-for="item in dough"
          :key="item.id"
          :item="item"
          :value="doughNameToValue.get(item.name)"
          :isSelected="selectedDough === doughNameToValue.get(item.name)"
          name="dough"
          @selectorChange="$emit('doughChange', { value: $event, id: item.id })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SelectorItem from "@/common/components/SelectorItem.vue";
import { doughNameToValue } from "@/common/enums";

export default {
  name: "BuilderDoughSelector",

  data() {
    return {
      doughNameToValue,
    };
  },

  props: {
    dough: {
      type: Array,
      required: true,
    },
    selectedDough: {
      type: String,
      required: true,
    },
  },

  components: {
    SelectorItem,
  },
};
</script>
<style lang="scss" scoped></style>
