class RecipeView {
  _container = document.querySelector(".recipe");
  _addbookmarkbtn = document.querySelector(".recipe__icons__heart");

  _reloadHandler(handler) {
    ["load", "hashchange"].forEach((event) => {
      window.addEventListener(event, handler);
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

  _renderRecipe(data) {
    this._container.textContent = "";

    this._container.insertAdjacentHTML("afterbegin", this._markup(data));
  }

  _handelAddToBookmark(handler) {
    this._container.addEventListener("click", function (e) {
      const btn = e.target.closest(".recipe__icons__heart");

      if (!btn) return;
      btn.classList.toggle("recipe__icons__heart--active");
      handler();
    });
  }

  _markup(data) {
    const html = `
    
    <div class="recipe__left">
    <div class="recipe__img-container">
      <img
        src="${data.image}"
        alt="meal image"
        class="recipe__img"
      />
    </div>

    <div class="recipe__ingredients">
      <div class="recipe__ingredients-header">
        <h3 class="heading-tertiary">Ingredients</h3>
        <div class="recipe__servings">
         <div class="recipe__icons__icon--servings  ">
          <i class="fa-solid fa-users"></i>         
         </div>

          <p class="recipe__number-servings">${data.servings}</p>
      
        </div>
      </div>
      <ul class="recipe__ingredients-list">
        ${this._createIngredients(data.ingredients)}
      </ul>
    </div>
  </div>




<div class="recipe__right">
  <h2 class="heading-secondary recipe__title">
    <span>${data.title}</span>
  </h2>


  <div class="recipe__icons">
   <div class="recipe__icons__social">
    <div class="recipe__icons__icon">
      <i class="fa-brands fa-facebook-f"></i>
    </div>
    <div class="recipe__icons__icon">
      <i class="fa-brands fa-twitter"></i>
    </div>
    <div class="recipe__icons__icon">
      <i class="fa-brands fa-pinterest-p"></i>
    </div>
   </div>

   <div class="recipe__icons__heart ${
     data.bookmarked ? "recipe__icons__heart--active" : ""
   } ">
    <i class="fa-solid fa-heart"></i>   
   </div>
  </div>

  <div class="recipe__nutritions-container">
    <h5 class="heading-quintary u-margin-bottom-small">
      Nutrition per serving
    </h5>
  </div>
  <div class="recipe__nutritions">
    <div class="recipe__nutrition">
      <div class="recipe__nutrition__value nutrition-value-calories">
        ${data.nutritions.calories}
      </div>
      <p>Calories</p>
    </div>
    <div class="recipe__nutrition">
      <div class="recipe__nutrition__value nutrition-value-fat">
      ${data.nutritions.fat}
      </div>
      <p>Fats</p>
    </div>
    <div class="recipe__nutrition">
      <div class="recipe__nutrition__value nutrition-value-carb">
      ${data.nutritions.carbs}
      </div>
      <p>Carbs</p>
    </div>
   
    <div class="recipe__nutrition">
      <div class="recipe__nutrition__value nutrition-value-protein">
      ${data.nutritions.protein}
      </div>
      <p>Protein</p>
    </div>
  </div>

  <ul class="recipe__instructions-list">
    <h3 class="heading-tertiary u-margin-bottom">Instructions</h3>

    ${this._createInstructions(data.instructions)}
  </ul>
</div>
    
    `;

    return html;
  }

  _createIngredients(ingredients) {
    let html = "";
    ingredients.forEach((ing) => {
      html += `
        
      <li class="recipe__ingredient">
        <p class="ingredient">${ing.name}</p>
        <p class="ingredient-quantity">${ing.amount}</p>
      </li>
        
        `;
    });

    return html;
  }

  _createInstructions(instructions) {
    let html = "";

    instructions.forEach((inst, index) => {
      html += `
    
  <li class="recipe__instruction">
    <div class="number-instruction">${index + 1}</div>
    <p class="instruction">
      ${inst}
    </p>
  </li>
    
    `;
    });

    return html;
  }

  /*
  
  
  
  */
}

export default new RecipeView();
