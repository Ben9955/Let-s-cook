import MealView from "./mealView";

class BookmarkView extends MealView {
  _container = document.querySelector(".bookmark__list");
  _bookmarkBtnContainer = document.querySelector(".nav__item--bookmark");

  _mainContainer = document.querySelector(".bookmark");

  // handler render bookmarks in the container
  // _handleBookmarks(handler) {
  //   window.addEventListener("load", handler);
  // }

  _handleBookmarksContainer() {
    this._bookmarkBtnContainer.addEventListener(
      "click",
      function (e) {
        const btnBookmarks = e.target.closest(".nav__item--bookmark");

        if (!btnBookmarks) return;

        this._mainContainer.classList.toggle("bookmark--active");
      }.bind(this)
    );
  }
}

export default new BookmarkView();
