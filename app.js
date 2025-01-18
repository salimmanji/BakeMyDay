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

  const recipes = [{
    name: "Crock Pot Roast",
    author: "Salim",
    type: ["meal", "dessert"],
    ingredients: [
      {
        quantity: "1",
        name: " beef roast",
      },
      {
        quantity: "1 package",
        name: "brown gravy mix",
      },
      {
        quantity: "1 package",
        name: "dried Italian salad dressing mix",
      },
      {
        quantity: "1 package",
        name: "dry ranch dressing mix",
      },
      {
        quantity: "1/2 cup",
        name: "water",
      },
    ],
    steps: [
      "Place beef roast in crock pot.",
      "Mix the dried mixes together in a bowl and sprinkle over the roast.",
      "Pour the water around the roast.",
      "Cook on low for 7-9 hours.",
    ],
    imageURI: [
      "http://img.sndimg.com/food/image/upload/w_266/v1/img/recipes/27/20/8/picVfzLZo.jpg",
      "./melanzane.jpg",
      "./charcuterie.jpg",
      "./lachs.jpg",
    ],
    originalURL:
      "http://www.food.com/recipe/to-die-for-crock-pot-roast-27208",
  },
  {
    name: "Curried Lentils and Rice",
    author: "Salim",
    type: ["meal"],
    ingredients: [
      {
        quantity: "1 quart",
        name: "beef broth",
      },
      {
        quantity: "1 cup",
        name: "dried green lentils",
      },
      {
        quantity: "1/2 cup",
        name: "basmati rice",
      },
      {
        quantity: "1 tsp",
        name: "curry powder",
      },
      {
        quantity: "1 tsp",
        name: "salt",
      },
    ],
    steps: [
      "Bring broth to a low boil.",
      "Add curry powder and salt.",
      "Cook lentils for 20 minutes.",
      "Add rice and simmer for 20 minutes.",
      "Enjoy!",
    ],
    imageURI: [],
  },
  {
    name: "Big Night Pizza",
    author: "Salim",
    type: ["meal"],
    ingredients: [
      {
        quantity: "5 teaspoons",
        name: "yeast",
      },
      {
        quantity: "5 cups",
        name: "flour",
      },
      {
        quantity: "4 tablespoons",
        name: "vegetable oil",
      },
      {
        quantity: "2 tablespoons",
        name: "sugar",
      },
      {
        quantity: "2 teaspoons",
        name: "salt",
      },
      {
        quantity: "2 cups",
        name: "hot water",
      },
      {
        quantity: "1/4 cup",
        name: "pizza sauce",
      },
      {
        quantity: "3/4 cup",
        name: "mozzarella cheese",
      },
    ],
    steps: [
      "Add hot water to yeast in a large bowl and let sit for 15 minutes.",
      "Mix in oil, sugar, salt, and flour and let sit for 1 hour.",
      "Knead the dough and spread onto a pan.",
      "Spread pizza sauce and sprinkle cheese.",
      "Add any optional toppings as you wish.",
      "Bake at 400 deg Fahrenheit for 15 minutes.",
      "Enjoy!",
    ],
    imageURI: [
      "./pizza.jpg",
      "http://upload.wikimedia.org/wikipedia/commons/c/c7/Spinach_pizza.jpg",
      "./lachs.jpg",
      "./gnochi.jpg",
      "./charcuterie.jpg",
      "./melanzane.jpg",
      "./2.jpg",
    ],
  },
  {
    name: "Cranberry and Apple Stuffed Acorn Squash Recipe",
    author: "Melanie",
    type: ["meal"],
    ingredients: [
      {
        quantity: "2",
        name: "acorn squash",
      },
      {
        quantity: "1",
        name: "boiling water",
      },
      {
        quantity: "2",
        name: "apples chopped into 1.4 inch pieces",
      },
      {
        quantity: "1/2 cup",
        name: "dried cranberries",
      },
      {
        quantity: "1 teaspoon",
        name: "cinnamon",
      },
      {
        quantity: "2 tablespoons",
        name: "melted butter",
      },
    ],
    steps: [
      "Cut squash in half, remove seeds.",
      "Place squash in baking dish, cut-side down.",
      "Pour 1/4-inch water into dish.",
      "Bake for 30 minutes at 350 degrees F.",
      "In large bowl, combine remaining ingredients.",
      "Remove squash from oven, fill with mix.",
      "Bake for 30-40 more minutes, until squash tender.",
      "Enjoy!",
    ],
    imageURI: [
      "http://elanaspantry.com/wp-content/uploads/2008/10/acorn_squash_with_cranberry.jpg",
    ],
    originalURL: "",
  },
  {
    name: "Mic's Yorkshire Puds",
    author: "Salim",
    type: ["meal"],
    ingredients: [
      {
        quantity: "200g",
        name: "plain flour",
      },
      {
        quantity: "3",
        name: "eggs",
      },
      {
        quantity: "300ml",
        name: "milk",
      },
      {
        quantity: "3 tbsp",
        name: "vegetable oil",
      },
    ],
    steps: [
      "Put the flour and some seasoning into a large bowl.",
      "Stir in eggs, one at a time.",
      "Whisk in milk until you have a smooth batter.",
      "Chill in the fridge for at least 30 minutes.",
      "Heat oven to 220C/gas mark 7.",
      "Pour the oil into the holes of a 8-hole muffin tin.",
      "Heat tin in the oven for 5 minutes.",
      "Ladle the batter mix into the tin.",
      "Bake for 30 minutes until well browned and risen.",
    ],
    imageURI: [
      "http://upload.wikimedia.org/wikipedia/commons/f/f9/Yorkshire_Pudding.jpg",
      "./SpaghettiEis.jpg",
    ],
    originalURL:
      "http://upload.wikimedia.org/wikipedia/commons/f/f9/Yorkshire_Pudding.jpg",
  },
  {
    name: "Old-Fashioned Oatmeal Cookies",
    author: "Salim",
    type: ["dessert", "cookie"],
    ingredients: [
      {
        quantity: "1 cup",
        name: "raisins",
      },
      {
        quantity: "1",
        name: "cup water",
      },
      {
        quantity: "3/4 cup",
        name: "shortening",
      },
      {
        quantity: "1 1/2 cups",
        name: "sugar",
      },
      {
        quantity: "2 1/2 cups",
        name: "flour",
      },
      {
        quantity: "1 tsp.",
        name: "soda",
      },
      {
        quantity: "1 tsp.",
        name: "salt",
      },
      {
        quantity: "1 tsp.",
        name: "cinnamon",
      },
      {
        quantity: "1/2 tsp.",
        name: "baking powder",
      },
      {
        quantity: "1/2 tsp.",
        name: "cloves",
      },
      {
        quantity: "2 cups",
        name: "oats",
      },
      {
        quantity: "1/2 cup",
        name: "chopped nuts",
      },
    ],
    steps: [
      "Simmer raisins and water over medium heat until raisins are plump, about 15 minutes.",
      "Drain raisins, reserving the liquid.",
      "Add enough water to reserved liquid to measure 1/2 cup.",
      "Heat oven to 400°.",
      "Mix thoroughly shortening, sugar, eggs and vanilla.",
      "Stir in reserved liquid.",
      "Blend in remaining ingredients.",
      "Drop dough by rounded teaspoonfuls about 2 inches apart onto ungreased baking sheet.",
      "Bake 8 to 10 minutes or until light brown.",
      "About 6 1/2 dozen cookies.",
    ],
    imageURI: [
      "http://s3.amazonaws.com/gmi-digital-library/65caecf7-a8f7-4a09-8513-2659cf92871e.jpg",
    ],
    originalURL: "#",
  },
  {
    name: "Blueberry Oatmeal Squares",
    author: "Melanie",
    type: ["dessert", "cookie"],
    ingredients: [
      {
        quantity: "2-1/2 cups",
        name: "rolled oats, (not instant)",
      },
      {
        quantity: "1-1/4 cups",
        name: "all-purpose flour",
      },
      {
        quantity: "1 tbsp",
        name: "grated orange rind",
      },
      {
        quantity: "1/4 tsp",
        name: "salt",
      },
      {
        quantity: "1 cup",
        name: "cold butter, cubed",
      },
      {
        quantity: "3/4 cup",
        name: "packed brown sugar",
      },
      {
        quantity: "3 cups",
        name: "fresh blueberries",
      },
      {
        quantity: "1/2 cup",
        name: "granulated sugar",
      },
      {
        quantity: "1/3 cup",
        name: "orange juice",
      },
      {
        quantity: "4 tsp",
        name: "cornstarch",
      },
    ],
    steps: [
      "Filling: In saucepan, bring blueberries, sugar and orange juice to boil; reduce heat and simmer until tender, about 10 minutes.",
      "Whisk cornstarch with 2 tbsp (25 mL) water; whisk into blueberries and boil, stirring, until thickened, about 1 minute.",
      "Place plastic wrap directly on surface; refrigerate until cooled, about 1 hour.",
      "In large bowl, whisk together oats, flour, sugar, orange rind and salt ; with pastry blender, cut in butter until in coarse crumbs.",
      "Press half into 8-inch (2 L) square parchment paper–lined metal cake pan; spread with blueberry filling.",
      "Bake in centre of 350°F oven until light golden, about 45 minutes.",
      "Let cool on rack before cutting into squares.",
      "(Make-ahead: Cover and refrigerate for up to 2 days or overwrap with heavy-duty foil and freeze for up to 2 weeks.)",
    ],
    imageURI: ["./blueberry pie.jpg"],
    originalURL:
      "http://www.canadianliving.com/food/blueberry_oatmeal_squares.php",
  },
  {
    name: "Curried chicken salad",
    author: "Salim",
    type: ["appetizer"],
    ingredients: [
      {
        quantity: "3",
        name: "skinless, boneless chicken breasts, halved lengthwise",
      },
      {
        quantity: "1/2 cup",
        name: "mayonnaise",
      },
      {
        quantity: "1 tbsp",
        name: "lemon zest",
      },
      {
        quantity: "1 tbsp ",
        name: "lemon juice",
      },
      {
        quantity: "1 1/2 tsp",
        name: "curry powder",
      },
      {
        quantity: "1/4 tsp",
        name: "salt",
      },
      {
        quantity: "2",
        name: "ripe mangoes, diced",
      },
      {
        quantity: "1/4 cup",
        name: "dried cranberries",
      },
      {
        quantity: "2",
        name: "green onions, thinly sliced",
      },
      {
        quantity: "1",
        name: "celery stalk, finely chopped",
      },
      {
        quantity: "6 leaves",
        name: "Boston lettuce",
      },
      {
        quantity: "6",
        name: "English muffins, toasted",
      },
    ],
    steps: [
      "ARRANGE chicken in a single layer in a large pot.",
      "Add water to just cover.",
      "Bring to a boil over medium-high.",
      "Flip chicken, reduce heat to medium and simmer until cooked, about 6 more min.",
      "Cool.",
      "STIR mayo with lemon zest, juice, curry and salt in large bowl.",
      "Using 2 forks, shred chicken, then stir into mayo mixture with mango, cranberries, green onions and celery.",
      "Divide among muffins with lettuce leaves",
      "Sandwich with tops",
    ],
    imageURI: [
      "http://www.chatelaine.com/wp-content/uploads/2013/05/Curried-chicken-salad.jpg",
    ],
    originalURL:
      "http://www.chatelaine.com/recipe/stovetop-cooking-method/curried-chicken-salad/",
  },
  {
    name: "Roasted Asparagus",
    type: ["meal"],
    ingredients: [
      {
        quantity: "1 lb",
        name: " asparagus",
      },
      {
        quantity: "1 1/2 tbsp",
        name: "olive oil",
      },
      {
        quantity: "1/2 tsp",
        name: "kosher salt",
      },
    ],
    steps: [
      "Preheat oven to 425°F.",
      "Cut off the woody bottom part of the asparagus spears and discard.",
      'With a vegetable peeler, peel off the skin on the bottom 2-3 inches of the spears (this keeps the asparagus from being all.",string.", and if you eat asparagus you know what I mean by that).',
      "Place asparagus on foil-lined baking sheet and drizzle with olive oil.",
      "Sprinkle with salt.",
      "With your hands, roll the asparagus around until they are evenly coated with oil and salt.",
      "Roast for 10-15 minutes, depending on the thickness of your stalks and how tender you like them.",
      "They should be tender when pierced with the tip of a knife.",
      "The tips of the spears will get very brown but watch them to prevent burning.",
      "They are great plain, but sometimes I serve them with a light vinaigrette if we need something acidic to balance out our meal.",
    ],
    imageURI: [
      "http://img.sndimg.com/food/image/upload/w_266/v1/img/recipes/50/84/7/picMcSyVd.jpg",
    ],
    originalURL: "http://www.food.com/recipe/roasted-asparagus-50847",
  },
{
name: "",
author: "",
type: ["", ],
ingredients: [
  {
    quantity: "",
    name: "",
  },
  {
    quantity: "",
    name: "",
  },
],
steps: [
  "",
  "",
],
imageURI: [
  "",
  "",
],
},
];
});
