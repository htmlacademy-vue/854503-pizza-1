<template>
  <div
    :draggable="isDraggable"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>
import { MOVE, DATA_TRANSFER_PAYLOAD } from "../const";

export default {
  name: "AppDrag",

  // data() {
  //   return {
  //     isDraggable: true,
  //   };
  // },

  props: {
    transferData: {
      type: Object,
      required: true,
    },
    isDraggable: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    onDrag({ dataTransfer }) {
      dataTransfer.effectAllowed = MOVE;
      dataTransfer.dropEffct = MOVE;
      dataTransfer.setData(
        DATA_TRANSFER_PAYLOAD,
        JSON.stringify(this.transferData)
      );
    },
  },
};
</script>
<style lang="scss" scoped></style>
