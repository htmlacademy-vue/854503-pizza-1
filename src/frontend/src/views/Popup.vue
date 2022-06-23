<template>
  <div class="fogging">
    <div class="popup">
      <router-link :to="redirectPath" class="close">
        <span class="visually-hidden">Закрыть попап</span>
      </router-link>
      <div class="popup__title">
        <h2 class="title">Спасибо за заказ</h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <router-link :to="redirectPath" class="button"
          >Отлично, я жду!</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Popup",

  computed: {
    ...mapState("Auth", ["user"]),

    redirectPath() {
      const name = this.user ? "Orders" : "Index";

      return { name };
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/blocks/fogging";
</style>
