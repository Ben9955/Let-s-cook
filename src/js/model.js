import { getJson } from "./helpers";
import { KEYY } from "./config";

export let searchData = [];

export const state = {
  recipe: {
    nutritions: {},
    ingredients: [],
    instructions: [],
  },

  bookmarks: [],
};

/*




*/

const createArraySearch = function (results) {
  searchData = [];

  results.forEach((result) => {
    const id = result.id;
    const image = result.image;
    const author = result.sourceName.replace(/\.\w+/g, "");
    const title = result.title;
    const calories = result.nutrition.nutrients[0].amount;
    const readyTime = result.readyInMinutes;

    searchData.push({
      id,
      image,
      author,
      title,
      nutritions: { calories },
      readyTime,
    });
  });
};

export const searchResult = async function (query, parameter = "") {
  try {
    const data = await getJson(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${KEYY}&query=${query}&addRecipeInformation=true&addRecipeNutrition=true${parameter}`
    );

    const { results } = data;

    createArraySearch(results);
  } catch (err) {
    throw err;
  }
};

/*













*/

export const recipeData = async function (Id) {
  const data = await Promise.all([
    getJson(
      `https://api.spoonacular.com/recipes/${Id}/analyzedInstructions?apiKey=${KEYY}`
    ),
    getJson(
      `https://api.spoonacular.com/recipes/${Id}/information?apiKey=${KEYY}&includeNutrition=true`
    ),
  ]);

  init();

  const [instruction, informations] = data;

  const { id, title, readyInMinutes, servings, image, sourceName } =
    informations;

  state.recipe.id = id;
  state.recipe.title = title;
  state.recipe.readyTime = readyInMinutes;
  state.recipe.image = image;
  state.recipe.servings = servings;
  state.recipe.author = sourceName.replace(/\.\w+/g, "");

  //

  //

  state.recipe.instructions = [];

  const { steps } = instruction[0];
  steps.forEach((stepObj) => {
    state.recipe.instructions.push(stepObj.step);
  });

  //

  //

  //

  const { nutrients } = informations.nutrition;

  nutrients.forEach((nutrient) => {
    if (nutrient.name === "Calories")
      state.recipe.nutritions.calories = nutrient.amount;

    if (nutrient.name === "Carbohydrates")
      state.recipe.nutritions.carbs = nutrient.amount;
    if (nutrient.name === "Fat") state.recipe.nutritions.fat = nutrient.amount;
    if (nutrient.name === "Protein")
      state.recipe.nutritions.protein = nutrient.amount;
  });

  //

  //

  //

  const { extendedIngredients } = informations;

  const ingredientsArr = [];
  extendedIngredients.forEach((ing) => {
    const { name } = ing;
    const { amount, unitShort: unit } = ing.measures.metric;

    const ingredient = {
      name: name.slice(0, 1).toUpperCase() + name.slice(1),
      amount: parseFloat(amount.toFixed(2)) + " " + unit,
    };

    ingredientsArr.push(ingredient);
  });

  state.recipe.ingredients = ingredientsArr;

  //

  //

  if (state.bookmarks.some((bookmark) => bookmark.id === id)) {
    state.recipe.bookmarked = true;
  } else {
    state.recipe.bookmarked = false;
  }
};

/*





*/

const addToLocalStorage = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  recipe.bookmarked = true;

  const recipee = JSON.parse(JSON.stringify(recipe));
  state.bookmarks.push(recipee);
  console.log(recipee);
  console.log(recipe);

  addToLocalStorage();
};

export const removeBookmark = function (recipe) {
  recipe.bookmarked = false;

  const recipee = JSON.parse(JSON.stringify(recipe));

  const index = state.bookmarks.findIndex(
    (bookmark) => bookmark.id === recipee.id
  );

  state.bookmarks.splice(index, 1);

  addToLocalStorage();
};

/*



*/

/*



*/

function init() {
  const storage = localStorage.getItem("bookmarks");

  if (storage) state.bookmarks = JSON.parse(storage);
}

init();
