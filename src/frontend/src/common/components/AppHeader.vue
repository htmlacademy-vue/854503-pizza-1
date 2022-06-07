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
    <div v-if="userData" class="header__user">
      <router-link :to="{ name: 'Profile' }">
        <picture>
          <source
            type="image/webp"
            srcset="img/users/user5.webp 1x, img/users/user5@2x.webp 2x"
          />
          <img
            src="img/users/user5.jpg"
            srcset="img/users/user5@2x.jpg"
            alt="Василий Ложкин"
            width="32"
            height="32"
          />
        </picture>
        <span>Василий Ложкин</span>
      </router-link>
      <a @click.prevent="logout" class="header__logout"><span>Выйти</span></a>
    </div>

    <div v-else class="header__user">
      <router-link :to="{ name: link }" class="header__login"
        ><span>Войти</span></router-link
      >
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",

  props: {
    userData: {
      type: Object,
      default: null,
    },
  },

  methods: {
    logout() {
      return;
    },
    redirectUser() {
      if (this.$route.name === "Cart") {
        return;
      } else {
        this.$router.push("Cart");
      }
    },
  },
  computed: {
    totalPrice() {
      return this.$store.getters["Cart/getCartPrice"];
    },

    link() {
      return this.$route.name === "Index" ? "IndexLogin" : "CartLogin";
    },
  },
};
</script>
