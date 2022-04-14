<template>
  <li class="ingredients__item">
    <AppDrop @drop="$emit('drop', $event)">
      <AppDrag :transferData="item" :isDraggable="isDraggable">
        <span class="filling" :class="`filling--${item.imageName}`">
          {{ item.name }}
        </span>

        <div
          class="counter counter--orange ingredients__counter"
          @click="countChange"
        >
          <button
            type="button"
            class="counter__button counter__button--minus"
            :disabled="count === MIN_INGREDIENTS"
          >
            <span class="visually-hidden">Меньше</span>
          </button>
          <input
            type="text"
            name="counter"
            class="counter__input"
            :value="count"
            @change="countChange"
          />
          <button
            type="button"
            class="counter__button counter__button--plus"
            :disabled="count >= MAX_INGREDIENTS"
          >
            <span class="visually-hidden">Больше</span>
          </button>
        </div>
      </AppDrag>
    </AppDrop>
  </li>
</template>

<script>
import { MAX_INGREDIENTS, MIN_INGREDIENTS } from "../const";
import AppDrag from "./AppDrag";
import AppDrop from "./AppDrop";

export default {
  name: "ItemCounter",

  components: {
    AppDrag,
    AppDrop,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    isDraggable: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      MAX_INGREDIENTS,
      MIN_INGREDIENTS,
    };
  },

  methods: {
    countChange(evt) {
      let currentCount = this.count;
      if (evt.target.classList.contains("counter__button--minus")) {
        --currentCount;
      } else if (evt.target.classList.contains("counter__input")) {
        currentCount = Number.parseInt(evt.target.value, 10);
      } else if (evt.target.classList.contains("counter__button--plus")) {
        ++currentCount;
      } else {
        return;
      }

      this.$emit("countChange", { id: this.item.id, count: currentCount });

      // if (this.currentCount === MAX_INGREDIENTS) {
      //   this.isDraggable = false;
      //   return;
      // }
      // if (this.currentCount < MAX_INGREDIENTS) {
      //   this.isDraggable = true;
      // }
    },
  },
};
</script>
<style lang="scss" scoped></style>
