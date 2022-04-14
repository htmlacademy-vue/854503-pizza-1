export const getIngredient = (pizza) => {
  const ingredients = pizza.ingredients.map((ingredient) => {
    let item = ingredient.image.split("/");

    item = item[item.length - 1].replace(".svg", "");

    return Object.assign(ingredient, { imageName: item });
  });

  return Object.assign(pizza, { ingredients: ingredients });
};

export const findItem = (array, value) => {
  return array.find((item) => {
    if (item.value) {
      return item.value === value;
    } else {
      return item.id === value;
    }
  });
};

export const makeIngredientsList = (ingredients) => {
  const list = {};

  for (let item of ingredients) {
    list[item.id] = {
      count: 2,
      price: item.price,
    };
  }

  return list;
};
