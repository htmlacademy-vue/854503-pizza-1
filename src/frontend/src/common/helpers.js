import {
  doughNameToValue,
  sizeNameToValue,
  sauceNameToValue,
} from "../common/enums";

export const getIngredients = (pizza) => {
  const ingredients = pizza.ingredients.map((ingredient) => {
    let item = getIngredientName(ingredient);

    return Object.assign(ingredient, { ingredientName: item });
  });

  return ingredients;
};

export const getIngredientName = (ingredient) => {
  let ingredientName = ingredient.image.split("/");

  ingredientName = ingredientName[ingredientName.length - 1].replace(
    ".svg",
    ""
  );

  return ingredientName;
};

export const findItemByValue = (array, value) => {
  return array.find((item) => {
    return item.value === value;
  });
};

export const findItemById = (array, id) => {
  return array.find((item) => {
    return item.id === Number.parseInt(id, 10);
  });
};

export const makeIngredientsList = (ingredients) => {
  const list = {};

  for (let item of ingredients) {
    list[item.id] = {
      ingredientName: item.ingredientName,
      count: 0,
    };
  }

  return list;
};

export const getDefaultPizza = (pizza) => {
  return {
    size: {
      value: sizeNameToValue.get(pizza.sizes[0].name).value,
      multiplier: pizza.sizes[0].multiplier,
    },
    sauce: {
      value: sauceNameToValue.get(pizza.sauces[0].name),
      price: pizza.sauces[0].price,
    },
    dough: {
      value: doughNameToValue.get(pizza.dough[0].name),
      price: pizza.dough[0].price,
    },
  };
};
