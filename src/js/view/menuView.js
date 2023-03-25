import MealView from "./mealView";

class MenuView extends MealView {
  _parentElement = document.querySelectorAll(".nav__item__menu");
  _menuValue;
  _menu;

  getMenuValue() {
    return this._menuValue;
  }

  getMenu() {
    return this._menu;
  }

  _;

  _menuHandler(handler) {
    this._parentElement.forEach((element) => {
      element.addEventListener(
        "click",
        function (e) {
          if (!e.target.classList.contains("menuItem")) return;
          this._menu = e.target.closest(".cuisine") ? "cuisine" : "diet";

          this._menuValue = e.target.textContent;

          handler();
        }.bind(this)
      );
    });
  }
}

export default new MenuView();
