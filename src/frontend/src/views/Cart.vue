<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="!pizza.length" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul class="cart-list sheet">
          <CartPizza
            v-for="item in pizza"
            :key="item.id"
            :id="item.id"
            :name="item.name"
            :count="item.count"
            :ingredients="item.ingredients"
            :sauce="item.foundation.sauce"
            :dough="item.foundation.dough"
            :size="item.foundation.size"
            :price="item.price"
          />
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <CartMisc
              v-for="item in misc"
              :key="item.id"
              :id="item.id"
              :name="item.name"
              :image="item.image"
              :price="item.price"
              :count="item.count"
            />
          </ul>
        </div>

        <div class="cart__form">
          <CartAddressForm
            :addressIndex.sync="addressIndex"
            @input="input"
            @infoChange="isDisabled = $event"
          />
        </div>
      </div>
      <router-view @log-in="$emit('log-in', $event)" />
    </main>
    <section class="footer">
      <div class="footer__more">
        <router-link
          :to="{ name: 'Index' }"
          class="button button--border button--arrow"
          >Хочу еще одну
        </router-link>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ getCartPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button
          :disabled="isDisabled"
          type="submit"
          class="button"
          @click.prevent="order"
        >
          Оформить заказ
        </button>
      </div>
    </section>
  </form>
</template>

<script>
import CartPizza from "@/modules/Cart/CartPizza";
import CartMisc from "@/modules/Cart/CartMisc";
import CartAddressForm from "@/modules/Cart/CartAddressForm";
import validator from "@/common/mixins/validator";
import { mapGetters, mapState } from "vuex";

export default {
  name: "Cart",

  components: {
    CartPizza,
    CartMisc,
    CartAddressForm,
  },

  data() {
    return {
      addressInfo: {},
      addressIndex: 0,
      isDisabled: true,
      validations: {
        tel: {
          error: "",
          rules: ["tel"],
        },
        street: {
          error: "",
          rules: ["required"],
        },
        apartment: {
          error: "",
          rules: ["required"],
        },
        house: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },

  mixins: [validator],

  computed: {
    ...mapState("Cart", ["pizza", "misc"]),
    ...mapGetters("Cart", ["getCartPrice"]),
  },

  methods: {
    input(evt) {
      this.addressInfo = evt.selectedAddress;
    },

    order() {
      let isValid = false;

      if (this.addressIndex === 0) {
        isValid = this.$validateFields(
          { tel: this.addressInfo.tel },
          { tel: this.validations.tel }
        );
      } else {
        isValid = this.$validateFields(this.addressInfo, this.validations);
      }

      if (isValid) {
        this.$store.dispatch("Orders/addOrder");
        this.$store.dispatch("Cart/clearCart");
        this.$router.push({ name: "Success" });
      } else {
        Object.keys(this.validations).forEach((key) => {
          console.log(this.validations[key].error);
        });
      }
    },
  },
};
</script>
