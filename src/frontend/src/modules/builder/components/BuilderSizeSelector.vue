<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <SelectorItem
          v-for="item in sizes"
          :key="item.id"
          :item="item"
          :value="sizeNameToValue.get(item.name)"
          :isSelected="selectedSize.value === sizeNameToValue.get(item.name)"
          name="diameter"
          @selectorChange="$emit('sizeChange', { value: $event, id: item.id })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SelectorItem from "@/common/components/SelectorItem";
import { sizeNameToValue } from "@/common/enums";

export default {
  name: "BuilderSizeSelector",

  props: {
    sizes: {
      type: Array,
      required: true,
    },
    selectedSize: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      sizeNameToValue,
    };
  },

  components: {
    SelectorItem,
  },
};
</script>
<style lang="sss" scoped></style>
