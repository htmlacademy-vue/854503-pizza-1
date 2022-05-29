<template>
  <div class="fogging">
    <div class="sign-form">
      <a href="#" class="close close--white">
        <span class="visually-hidden">Закрыть форму авторизации</span>
      </a>
      <div class="sign-form__title">
        <h1 class="title title--small">Авторизуйтесь на сайте</h1>
      </div>
      <form action="test.html" method="post">
        <div class="sign-form__input">
          <AppInput
            :title="'E-mail'"
            :type="'email'"
            :name="'email'"
            :placeholder="'example@mail.ru'"
            :required="true"
            @input="email = $event"
          />
        </div>

        <div class="sign-form__input">
          <AppInput
            :title="'Пароль'"
            :type="'password'"
            :name="'pass'"
            :placeholder="'***********'"
            :required="true"
            @input="pass = $event"
          />
        </div>
        <button type="submit" class="button" @click="submitData">
          Авторизоваться
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import AppInput from "@/common/components/AppInput";

export default {
  name: "Login",

  components: {
    AppInput,
  },

  data() {
    return {
      email: "",
      pass: "",
    };
  },

  methods: {
    submitData() {
      console.log(this.$route, this.$router);
      if (this.email && this.pass) {
        this.$emit("log-in", { email: this.email, pass: this.pass });
        this.$router.back();
      }
    },
  },
};
</script>
<style lang="scss">
@import "~@/assets/scss/blocks/fogging";
</style>
