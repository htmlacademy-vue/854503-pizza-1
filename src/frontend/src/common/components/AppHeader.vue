<template>
  <header class="header">
    <div class="header__logo">
      <router-link :to="{ name: 'Index' }" class="logo">
        <img
          src="img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link
        :to="{ name: 'Cart' }"
        :class="{ disabled: $route.name === 'Cart' }"
        >{{ totalPrice }} ₽</router-link
      >
    </div>
    <div v-if="user" class="header__user">
      <router-link :to="{ name: 'Profile' }">
        <picture>
          <source
            :srcset="`${user.avatar} 1x, ${user.avatar} 2x`"
            type="image/webp"
          />
          <img
            :src="user.avatar"
            :srcset="user.avatar"
            :alt="user.name"
            width="32"
            height="32"
          />
        </picture>
        <span>{{ user.name }}</span>
      </router-link>
      <a @click.prevent class="header__logout"><span>Выйти</span></a>
    </div>

    <div v-else class="header__user">
      <router-link
        :to="{
          name: link,
        }"
        class="header__login"
      >
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppHeader",

  props: {
    userData: {
      type: Object,
      default: null,
    },
  },

  methods: {
    redirectUser() {
      if (this.$route.name === "Cart") {
        return;
      } else {
        this.$router.push("Cart");
      }
    },
  },
  computed: {
    ...mapState("Auth", ["user"]),

    totalPrice() {
      return this.$store.getters["Cart/getCartPrice"];
    },

    link() {
      return this.$route.name === "Index" ? "IndexLogin" : "CartLogin";
    },
  },
};
</script>
