export default class MealView {
  _renderSearchResults(data) {
    this._container.textContent = "";

    data.forEach((meal) => {
      this._container.insertAdjacentHTML("beforeend", this._markup(meal));
    });
  }

  _renderError(message) {
    this._container.textContent = "";
    const html = `
    <div class="message">
      <div class="message__icon">
       <i class="fa-solid fa-triangle-exclamation"></i>
      </div>
      <p class="message__paragrph">
        ${message}
      </p>
   </div>
`;
    this._container.insertAdjacentHTML("beforeend", html);
  }

  _markup(data) {
    const html = `
              <li class="search-result__item meal">
          
              <a class="meal__link" href="#${data.id}">  
          
                      <div class="meal__img-container">
                        <img
                          src="${data.image}"
                          alt="meal image"
                          class="meal__img"
                        />
                      </div>
                      <div class="meal__info u-margin-top-small">
                        <h3 class="heading-tertiary meal__title">${data.title}</h3>
                        <p class="meal__author">${data.author}</p>
          
                        <div class="meal__details">
                          <p class="meal__kcal">
                            <span class="meal__kcal__value">${data.nutritions.calories}</span> Kcal
                          </p>
                          <div class="meal__duration">
                            <i class="meal__icon fa-regular fa-clock"></i>
                            <span class="meal__kcal__value">${data.readyTime}min</span>
                          </div>
                        </div>
                      </div>
                      </a>
                    </li>
              
              
              `;

    return html;
  }
}
