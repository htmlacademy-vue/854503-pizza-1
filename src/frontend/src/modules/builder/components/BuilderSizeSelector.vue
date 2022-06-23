<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <SelectorItem
          v-for="item in jsonPizza.sizes"
          :key="item.id"
          :item="item"
          :value="sizeNameToValue.get(item.name)"
          :isSelected="foundation.size.id === item.id"
          storeAction="Builder/sizeChange"
          name="diameter"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SelectorItem from "@/common/components/SelectorItem";
import { sizeNameToValue } from "@/common/enums";
import { mapState } from "vuex";

export default {
  name: "BuilderSizeSelector",

  data() {
    return {
      sizeNameToValue,
    };
  },

  components: {
    SelectorItem,
  },

  computed: {
    ...mapState("Builder", ["foundation", "jsonPizza"]),
  },
};
</script>
