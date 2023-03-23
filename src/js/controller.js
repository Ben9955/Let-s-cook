import {
  searchResult,
  recipeData,
  addBookmark,
  state,
  searchData,
  removeBookmark,
  manageDataServings,
} from "./model";

import SearchView from "./view/searchView";
import MenuView from "./view/menuView";
import RecipeView from "./view/recipeView";

import BookmarkView from "./view/bookmarkView";
import recipeView from "./view/recipeView";

if (module.hot) {
  module.hot.accept();
}

if (state.bookmarks.length > 0)
  BookmarkView._renderSearchResults(state.bookmarks);

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

const controlMenuHandler = async function () {
  try {
    const parameter = `&${MenuView.getMenu()}=${MenuView.getMenuValue()}`;
    SearchView._renderLoading();

    await searchResult("", parameter);
    console.log(searchData, state.recipe);
    SearchView._renderSearchResults(searchData);
  } catch (err) {}
};

/*




*/

const controlloadhandler = async function () {
  try {
    const hash = location.hash;

    if (!hash) return;

    const id = hash.slice(1);
    if (!id) return;

    RecipeView._renderLoading();

    if (state.bookmarks.length > 0)
      BookmarkView._renderSearchResults(state.bookmarks);

    await recipeData(id);
    RecipeView._renderRecipe(state.recipe);
    console.log(state.recipe);
  } catch (err) {
    console.log(err);
  }
};

/*




*/

const controlAddBookmark = function () {
  if (!state.recipe.bookmarked) addBookmark(state.recipe);
  else removeBookmark(state.recipe);

  console.log(state.bookmarks, state.recipe.bookmarked);
  // if (state.bookmarks.length > 0)
  BookmarkView._renderSearchResults(state.bookmarks);
};

const controllServings = function (action) {
  manageDataServings(10, state.recipe);

  RecipeView._renderRecipe(state.recipe);
};

/*




*/

BookmarkView._handleBookmarksContainer();
RecipeView._handelAddToBookmark(controlAddBookmark);

RecipeView._manageServings(controllServings);
RecipeView._reloadHandler(controlloadhandler);

SearchView._submitHandler(controlSubmitHandler);

MenuView._menuHandler(controlMenuHandler);
