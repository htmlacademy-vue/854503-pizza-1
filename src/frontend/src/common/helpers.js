export const getIngredient = (pizza) => {
  const ingredients = pizza.ingredients.map((ingredient) => {
    let item = ingredient.image.split("/");

    item = item[item.length - 1].replace(".svg", "");

    return Object.assign(ingredient, { imageName: item });
  });

  return Object.assign(pizza, { ingredients: ingredients });
};
