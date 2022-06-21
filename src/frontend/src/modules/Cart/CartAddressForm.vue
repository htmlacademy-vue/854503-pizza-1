<template>
  <div class="cart-form">
    <label class="cart-form__select">
      <span class="cart-form__label">Получение заказа:</span>

      <select
        @input="selectAddress"
        :value="addressNumber"
        name="test"
        class="select"
      >
        <option
          v-for="(address, index) in addresses"
          :key="address"
          :value="index"
        >
          {{ address }}
        </option>
      </select>
    </label>

    <label class="input input--big-label">
      <span>Контактный телефон:</span>
      <input
        :value="selectedAddress.tel"
        type="text"
        name="tel"
        placeholder="+7 999-999-99-99"
        @input="input"
      />
    </label>

    <div v-if="addressNumber > 0" class="cart-form__address">
      <span class="cart-form__label">Новый адрес:</span>

      <div class="cart-form__input">
        <label class="input">
          <span>Улица*</span>
          <input
            type="text"
            name="street"
            :value="selectedAddress.street"
            :disabled="!isChangeable"
            @input="input"
          />
        </label>
      </div>

      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Дом*</span>
          <input
            type="text"
            name="house"
            :value="selectedAddress.house"
            :disabled="!isChangeable"
            @input="input"
          />
        </label>
      </div>

      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Квартира</span>
          <input
            type="text"
            name="apartment"
            :value="selectedAddress.apartment"
            :disabled="!isChangeable"
            @input="input"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

const emptyAddress = () => ({
  tel: "",
  street: "",
  apartment: "",
  house: "",
});

export default {
  name: "CartAdressForm",

  data() {
    return {
      selectedAddress: emptyAddress(),
      isChangeable: false,
    };
  },

  model: {
    prop: "addressNumber",
    event: "addressNumberChange",
  },

  props: {
    addressNumber: {
      type: [Number, String],
      default: 0,
    },
  },

  computed: {
    ...mapState("Auth", ["user"]),

    addresses() {
      const defaultAdresses = ["Заберу сам", "Новый адрес"];
      const userAdresses = this.user
        ? this.user.savedAddresses
          ? this.user.savedAddresses
          : null
        : null;

      if (userAdresses) {
        const names = userAdresses.map(({ name }) => name);
        return [...defaultAdresses, ...names];
      } else {
        return defaultAdresses;
      }
    },

    isDisabled() {
      const a = Object.values(this.selectedAddress).some((item) => item !== "");

      return !a;
    },
  },

  methods: {
    selectAddress(evt) {
      const addressName = this.addresses[evt.target.value];
      const index = this.user
        ? this.user.savedAddresses.findIndex(
            (item) => item.name === addressName
          )
        : -1;

      if (~index) {
        this.selectedAddress = {
          ...this.selectedAddress,
          ...this.user.savedAddresses[index],
        };
        this.isChangeable = false;
      } else {
        this.selectedAddress = emptyAddress();
        this.isChangeable = true;
      }
      this.$emit("addressNumberChange", evt.target.value);
      this.$emit("input", { selectedAddress: this.selectedAddress });
      this.$emit("infoChange", this.isDisabled);
    },

    input(evt) {
      this.selectedAddress[evt.target.name] = evt.target.value;
      this.$emit("input", { selectedAddress: this.selectedAddress });
      this.$emit("infoChange", this.isDisabled);
    },
  },
};
</script>
