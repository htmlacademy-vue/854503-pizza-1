<template>
  <body>
    <header class="header">
      <div class="header__logo">
        <a href="index.html" class="logo">
          <img
            src="img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="cart.html">0 ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
          <div class="content__dough">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>
              <div class="sheet__content dough">
                <SelectorItem
                  v-for="item in dough"
                  :key="item.id"
                  :item="item"
                  name="dough"
                >
                </SelectorItem>
              </div>
            </div>
          </div>
          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <div class="sheet__content diameter">
                <SelectorItem
                  v-for="item in sizes"
                  :key="item.id"
                  :item="item"
                  name="diameter"
                >
                </SelectorItem>
              </div>
            </div>
          </div>

          <div class="content__ingredients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">
                Выберите ингредиенты
              </h2>

              <div class="sheet__content ingredients">
                <div class="ingredients__sauce">
                  <p>Основной соус:</p>

                  <RadioButton
                    v-for="item in sauces"
                    :key="item.id"
                    :item="item"
                    name="sauce"
                  >
                  </RadioButton>
                </div>

                <div class="ingredients__filling">
                  <p>Начинка:</p>

                  <ul class="ingredients__list">
                    <ItemCounter
                      v-for="ingredient in pizza.ingredients"
                      :key="ingredient.id"
                      :item="ingredient"
                    >
                    </ItemCounter>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
              />
            </label>

            <div class="content__constructor">
              <div class="pizza pizza--foundation--big-tomato">
                <div class="pizza__wrapper">
                  <div class="pizza__filling pizza__filling--ananas"></div>
                  <div class="pizza__filling pizza__filling--bacon"></div>
                  <div class="pizza__filling pizza__filling--cheddar"></div>
                </div>
              </div>
            </div>

            <div class="content__result">
              <p>Итого: 0 ₽</p>
              <button type="button" class="button" disabled>Готовьте!</button>
            </div>
          </div>
        </div>
      </form>
    </main>
  </body>
</template>

<script>
import pizza from "../static/pizza";
import misc from "../static/misc";
import user from "../static/user";
import { getIngredient } from "../common/helpers";
import { dough, sizes, sauces } from "../common/enums";
import ItemCounter from "../common/components/ItemCounter";
import SelectorItem from "../common/components/SelectorItem";
import RadioButton from "../common/components/RadioButton";

export default {
  name: "IndexPage",

  components: {
    ItemCounter,
    SelectorItem,
    RadioButton,
  },

  data() {
    return {
      user,
      pizza: getIngredient(pizza),
      misc,
      sauces,
      dough,
      sizes,
    };
  },
};
</script>
<style lang="scss" scoped></style>
