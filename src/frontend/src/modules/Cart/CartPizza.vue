<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        :alt="name"
        src="img/product.svg"
        class="product__img"
        width="56"
        height="56"
      />
      <div class="product__text">
        <h2>{{ name }}</h2>
        <ul>
          <li>
            {{ size.name }}, на {{ doughValueToText.get(dough.value) }} тесте
          </li>
          <li>Соус: {{ sauce.name.toLowerCase() }}</li>
          <li>Начинка: {{ filling }}</li>
        </ul>
      </div>
    </div>

    <ItemCounter
      :id="id"
      :count="count"
      color="orange"
      block="additional-list"
      @countChange="$countChange($event, 'Cart/changePizzaCount')"
    />

    <div class="cart-list__price">
      <b>{{ price * count }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button
        type="button"
        class="cart-list__edit"
        @click.prevent="changePizza"
      >
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import { SET_PIZZA_TO_CHANGE } from "@/store/mutations-types";
import { doughValueToText } from "@/common/enums";
import countChange from "@/common/mixins/countChange";

export default {
  name: "CartPizza",

  components: {
    ItemCounter,
  },

  data() {
    return {
      doughValueToText,
    };
  },

  props: {
    id: {
      type: Number,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    ingredients: {
      type: Object,
      require: true,
    },
    sauce: {
      type: Object,
      require: true,
    },
    dough: {
      type: Object,
      require: true,
    },
    size: {
      type: Object,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
  },

  mixins: [countChange],

  computed: {
    filling() {
      const filling = [];

      for (let ingredient in this.ingredients) {
        if (this.ingredients[ingredient].count > 0) {
          const ingredientName =
            this.ingredients[ingredient].name.toLowerCase();

          filling.push(ingredientName);
        }
      }
      return filling.join(", ");
    },
  },

  methods: {
    changePizza() {
      const pizza = this.$store.state.Cart.pizza;
      const index = pizza.findIndex(({ id }) => id === this.id);
      const pizzaToChange = pizza[index];

      this.$store.commit(`Builder/${SET_PIZZA_TO_CHANGE}`, pizzaToChange);

      this.$router.push({ name: "Index" });
    },
  },
};
</script>
