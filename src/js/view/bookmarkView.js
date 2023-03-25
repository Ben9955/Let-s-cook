// importing the MealView class where we can find the markup
import MealView from "./mealView";

// managing the opening and closing bookmark container
class BookmarkView extends MealView {
  _container = document.querySelector(".bookmark__list");
  _bookmarkBtnContainer = document.querySelector(".nav__item--bookmark");

  _mainContainer = document.querySelector(".bookmark");

  constructor() {
    super();

    this._bookmarkBtnContainer.addEventListener(
      "click",
      this._handleBookmarksContainer.bind(this)
    );
    this._mainContainer.addEventListener("click", this._handleCloseBookmark);
  }

  _handleBookmarksContainer(e) {
    const btnBookmarks = e.target.closest(".nav__item--bookmark");

    if (!btnBookmarks) return;

    this._mainContainer.classList.toggle("bookmark--active");
  }

  _handleCloseBookmark() {
    console.log(this);
    this.classList.remove("bookmark--active");
  }
}

export default new BookmarkView();
