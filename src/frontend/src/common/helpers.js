import { dough, sizes, sauces } from "../common/enums";

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
