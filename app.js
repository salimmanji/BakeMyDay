//https://undraw.co/search/not-found
document.addEventListener("DOMContentLoaded", function () {
  let shouldShow = false;
  const elementMaker = (element) => document.createElement(`${element}`);
  const $ = (element) => document.querySelector(`${element}`);
  const $$ = (element) => document.querySelectorAll(`${element}`);

  $("#searchbar").addEventListener("keyup", displayMatches);
  $("#clearButton").addEventListener("click", clearer);
  $("#showAll").addEventListener("click", shower);
  $("#linkArea").addEventListener("click", showMeals);
  $("#linkArea").addEventListener("click", showDesserts);
  $("#linkArea").addEventListener("click", showCookies);
  $("#linkArea").addEventListener("click", showAppetizers);

  function displayMatches() {
    const matches = findMatches(this.value, recipes);
    const matchList = $("#matchList");
    if (this.value.length >= 2) {
      matchList.replaceChildren();
      matches.forEach((r) => {
        var li = elementMaker("li");
        li.textContent = `${r.name}`;
        li.addEventListener("click", (e) => {
          const recipetoPopulate = recipes.find(
            (r) => r.name == e.target.textContent
          );
          populateDivs(recipetoPopulate);
          $("#outerContainer").replaceChildren();
          if (shouldShow=== true) {
            $("#showAll").textContent = "Show Recipes";
            shouldShow = false;
          } else {
            $("#showAll").textContent = "Hide Recipes";
            shouldShow = true;
          }
        });
        matchList.appendChild(li);
      });
    } else {
      matchList.replaceChildren();
    }
  }

  function findMatches(wordToMatch, recipeList) {
    return recipeList.filter((r) => {
      const regex = new RegExp(wordToMatch, "gi");
      return r.name.match(regex);
    });
  }

  function findTypeMatches(wordToMatch, recipeList) {
    return recipeList.filter((r) => {
      const regex = new RegExp(wordToMatch, "gi");
      return r.type.some((ele) => ele.match(regex));
    });
  }

  function populateDivs(recipe) {
    const divToDisplay = $("#toDisplay");
    divToDisplay.replaceChildren();
    const closeDiv = elementMaker("div");
    closeDiv.classList.add("closeButton");
    closeDiv.textContent = "CLOSE RECIPE";
    divToDisplay.appendChild(closeDiv);
    divToDisplay.addEventListener("click", (e) => {
      if (
        e.target.textContent === "CLOSE RECIPE" &&
        e.target.tagName === "DIV"
      ) {
        divToDisplay.replaceChildren();
      }
    });
    divToDisplay.appendChild(recipeMaker(recipe));
  }

  function showMeals(e) {
    if (e.target.textContent === "Meals" && e.target.tagName === "A") {
      e.preventDefault();
      e.stopPropagation();
      $("#outerContainer").replaceChildren();
      const matches = findTypeMatches("meal", recipes);
      recipeList(matches);
      $("#showAll").textContent = "Hide Recipes";
      shouldShow = true;
    }
  }

  function showDesserts(e) {
    if (e.target.textContent === "Desserts" && e.target.tagName === "A") {
      e.preventDefault();
      e.stopPropagation();
      $("#outerContainer").replaceChildren();
      const matches = findTypeMatches("dessert", recipes);
      recipeList(matches);
      $("#showAll").textContent = "Hide Recipes";
      shouldShow = true;
    }
  }

  function showCookies(e) {
    if (e.target.textContent === "Cookies" && e.target.tagName === "A") {
      e.preventDefault();
      e.stopPropagation();
      $("#outerContainer").replaceChildren();
      const matches = findTypeMatches("cookie", recipes);
      recipeList(matches);
      $("#showAll").textContent = "Hide Recipes";
      shouldShow = true;
    }
  }

  function showAppetizers(e) {
    if (e.target.textContent === "Appetizers" && e.target.tagName === "A") {
      e.preventDefault();
      e.stopPropagation();
      $("#outerContainer").replaceChildren();
      const matches = findTypeMatches("appetizer", recipes);
      recipeList(matches);
      $("#showAll").textContent = "Hide Recipes";
      shouldShow = true;
    }
  }

  function shower() {
    shouldShow = !shouldShow;
    if (shouldShow) {
      $("#showAll").textContent = "Hide Recipes";
      shouldShow = true;
      recipeList(recipes);
    } else {
      $("#showAll").textContent = "Show Recipes";
      shouldShow = false;
      $("#outerContainer").replaceChildren();
    }
  }

  function clearer() {
    $(`#matchList`).replaceChildren();
    $(`#searchbar`).value = "";
    $("#toDisplay").replaceChildren();
  }

  function recipeList(list) {
    list.forEach((r) => {
      const recipe = recipeMaker(r);
      $("#outerContainer").appendChild(recipe);
    });
  }

  function recipeMaker(r) {
    const div = containerDivMaker();
    div.appendChild(titleMaker(r.name));
    div.appendChild(authorMaker(r.author));
    div.appendChild(imageMaker(r.name, r.imageURI[0], "pic"));
    const ings = elementMaker("h4");
    ings.textContent = "Zutaten";
    ings.classList.add("headers");
    div.appendChild(ings);
    div.appendChild(ingredientMaker(r.ingredients));
    const ins = elementMaker("h4");
    ins.classList.add("headers");
    ins.textContent = "Zubereitung";
    div.appendChild(ins);
    div.appendChild(stepMaker(r.steps));
    if (r.imageURI[1]) {
      const container = elementMaker("div");
      container.classList.add("otherPics");
      for (let i = 1; i < r.imageURI.length; i++) {
        container.appendChild(
          imageMaker(r.name, r.imageURI[i], "theOtherPics")
        );
      }
      div.appendChild(container);
    }
    return div;
  }

  function containerDivMaker() {
    const container = elementMaker("div");
    container.classList.add("container");
    return container;
  }

  function imageMaker(
    title = "No Photo Available",
    url = "./chef.svg",
    classtoAdd
  ) {
    const img = elementMaker("img");
    img.classList.add(classtoAdd);
    img.src = url;
    img.alt = title;
    return img;
  }

  function titleMaker(title = "Did you forget to include a title?") {
    const h2 = elementMaker("h2");
    h2.classList.add("title");
    h2.textContent = title;
    return h2;
  }

  function authorMaker(author = "Anonymous") {
    const h3 = elementMaker("h3");
    h3.classList.add("author");
    h3.textContent = `By: ${author}`;
    return h3;
  }

  function ingredientMaker(
    ingredients = ["Did you forget to include ingredients?"]
  ) {
    const div = elementMaker("div");
    div.classList.add("ingredients");
    const ul = elementMaker("ul");
    ul.classList.add("ingredientsList");
    div.appendChild(ul);
    ingredients.forEach((i) => {
      const li = elementMaker("li");
      li.textContent = `${i.quantity} ${i.name}`;
      ul.appendChild(li);
    });
    return div;
  }

  function stepMaker(steps = ["Did you forget to include steps?"]) {
    const div = elementMaker("div");
    div.classList.add("steps");
    const ol = elementMaker("ol");
    ol.classList.add("stepsList");
    div.appendChild(ol);
    steps.forEach((s) => {
      const li = elementMaker("li");
      li.textContent = s;
      ol.appendChild(li);
    });
    return div;
  }

  const recipes = [];
});
