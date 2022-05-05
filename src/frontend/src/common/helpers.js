import { dough, sizes, sauces } from "../common/enums";

export const getIngredient = (pizza) => {
  const ingredients = pizza.ingredients.map((ingredient) => {
    let item = ingredient.image.split("/");

    item = item[item.length - 1].replace(".svg", "");

    return Object.assign(ingredient, { imageName: item });
  });

  return Object.assign(pizza, { ingredients: ingredients });
};

export const findItemByValue = (array, value) => {
  return array.find((item) => {
    return item.value === value;
  });
};

export const findItemById = (array, id) => {
  return array.find((item) => {
    return item.id === id;
  });
};

export const makeIngredientsList = (ingredients) => {
  const list = {};

  for (let item of ingredients) {
    list[item.id] = 0;
  }

  return list;
};

export const getDefaultPizza = (d) => {
  const a = {
    size: {
      value: findItemById(sizes, d.sizes[0].id).value,
      multiplier: d.sizes[0].multiplier,
    },
    sauce: {
      value: findItemById(sauces, d.sauces[0].id).value,
      price: d.sauces[0].price,
    },
    dough: {
      value: findItemById(dough, d.dough[0].id).value,
      price: d.dough[0].price,
    },
  };
  return a;
};
