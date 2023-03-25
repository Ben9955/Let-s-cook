import MealView from "./mealView";

class SearchView extends MealView {
  _parentElement = document.querySelector(".search");
  _container = document.querySelector(".search-result__list");

  getValue() {
    const query = this._parentElement.querySelector(".search__field").value;
    this._parentElement.querySelector(".search__field").value = "";

    return query;
  }

  _submitHandler(handler) {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();

      handler();
    });
  }

  _renderLoading() {
    this._container.textContent = "";
    const html = `
          <div class="loading">
            <p class="loading__paragraph">Loading..</p>
          </div>
          `;

    this._container.insertAdjacentHTML("beforeend", html);
  }
}

export default new SearchView();
