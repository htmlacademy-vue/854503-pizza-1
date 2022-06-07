<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img :src="image" width="39" height="60" :alt="name" />
      <span>{{ name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <ItemCounter
        :id="id"
        :count="count"
        color="orange"
        block="additional-list"
        storeAction="changeMiscCount"
        storeModule="Cart"
      />

      <div class="additional-list__price">
        <b>× {{ price }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ItemCounter from "../../common/components/ItemCounter.vue";
export default {
  name: "CartMiscCard",
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState("Cart", ["misc"]),
  },
  methods: {
    ...mapActions("Cart", {
      changeMisccount: "changeMiscCount",
    }),
  },
  components: { ItemCounter },
};
</script>
