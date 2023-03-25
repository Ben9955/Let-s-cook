// importing some data from the model  and the views

import {
  searchResult,
  recipeData,
  addBookmark,
  state,
  searchData,
  removeBookmark,
} from "./model";

import SearchView from "./view/searchView";
import MenuView from "./view/menuView";
import RecipeView from "./view/recipeView";

import BookmarkView from "./view/bookmarkView";

// this code is for parcel so is not gonna load the page always
if (module.hot) {
  module.hot.accept();
}

if (state.bookmarks.length > 0)
  BookmarkView._renderSearchResults(state.bookmarks);

// control when the user submit a query from the form
const controlSubmitHandler = async function () {
  try {
    const query = SearchView.getValue();

    if (!query) return;

    SearchView._renderLoading();

    await searchResult(query);

    SearchView._renderSearchResults(searchData);
  } catch (err) {
    SearchView._renderError(err.message);
  }
};

/*





*/

// control when the user submit from the menus

const controlMenuHandler = async function () {
  try {
    // this is the parameter for the fetch that will pass as arguments in the searchResult
    const parameter = `&${MenuView.getMenu()}=${MenuView.getMenuValue()}`;
    SearchView._renderLoading();

    await searchResult("", parameter);
    SearchView._renderSearchResults(searchData);
  } catch (err) {}
};

/*




*/

// each time the user click a recipe the # will change and triger the load recipe info
const controlloadhandler = async function () {
  try {
    const hash = location.hash;

    if (!hash) return;

    const id = hash.slice(1);

    RecipeView._renderLoading();

    if (state.bookmarks.length > 0)
      BookmarkView._renderSearchResults(state.bookmarks);

    await recipeData(id);
    RecipeView._renderRecipe(state.recipe);
  } catch (err) {
    console.log(err);
  }
};

/*




*/

const controlAddBookmark = function () {
  if (!state.recipe.bookmarked) addBookmark(state.recipe);
  else removeBookmark(state.recipe);

  // if (state.bookmarks.length > 0)
  BookmarkView._renderSearchResults(state.bookmarks);
};

/*




*/

function init() {
  RecipeView._handelAddToBookmark(controlAddBookmark);

  RecipeView._reloadHandler(controlloadhandler);

  SearchView._submitHandler(controlSubmitHandler);

  MenuView._menuHandler(controlMenuHandler);
}

init();
