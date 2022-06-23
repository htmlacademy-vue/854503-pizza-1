<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <SelectorItem
          v-for="item in jsonPizza.dough"
          :key="item.id"
          :item="item"
          :value="doughNameToValue.get(item.name)"
          :isSelected="foundation.dough.id === item.id"
          name="dough"
          @selectorChange="
            selectorChange({ id: item.id, value: $event.target.value })
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import SelectorItem from "@/common/components/SelectorItem.vue";
import { doughNameToValue } from "@/common/enums";
import { mapState } from "vuex";

export default {
  name: "BuilderDoughSelector",

  components: {
    SelectorItem,
  },

  data() {
    return {
      doughNameToValue,
    };
  },

  computed: {
    ...mapState("Builder", ["foundation", "jsonPizza"]),
  },

  methods: {
    selectorChange({ id, value }) {
      this.$store.dispatch("Builder/doughChange", {
        id,
        value,
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
