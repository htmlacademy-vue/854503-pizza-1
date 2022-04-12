<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <SelectorItem
          v-for="item in sizes"
          :key="item.id"
          :item="item"
          name="diameter"
          @selectorChange="$emit('sizeChange', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SelectorItem from "../../../common/components/SelectorItem";

export default {
  name: "BuilderSizeSelector",

  props: {
    sizes: {
      type: Array,
      required: true,
    },
  },

  components: {
    SelectorItem,
  },
};
</script>
<style lang="sss" scoped></style>
