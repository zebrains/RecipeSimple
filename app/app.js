var recipeSimple = angular.module('recipeSimple', []);

recipeSimple.controller('recipeController', function recipeController($scope) {
  $scope.editing = false;


  $scope.selectedRecipe = {};
  $scope.selectedRecipeIndex = null;

  $scope.rawIngredients = "";

  $scope.recipes = [
    {
      name: "Joe Jost's Pickled Eggs",
      ingredients: [
          {
            name: "Hard-Boiled Eggs",
            quantity: "12 Eggs"
          },
          {
            name: "Water",
            quantity: "6 Cups"
          }
      ],
      directions: [
        "Mix all ingredients together in some sort of a really odd dance of insanity. This should make sure that this recipe can not be replicated at all.",
        "There should be more directions...but ther are not. Get over it!",
        "There should be more directions...but ther are not. Get over it!",
        "There should be more directions...but ther are not. Get over it!",
        "There should be more directions...but ther are not. Get over it!"
      ]
    },
    {
      name: "Chicken Soup",
      ingredients: [
        {
          name: "Chicken",
          quantity: "1.5 pounds"
        },
        {
          name: "Water",
          quantity: "7 cups"
        }
      ],
      directions: [
        "Mix all ingredients together in some sort of a really odd dance of insanity. This should make sure that this recipe can not be replicated at all.",
        "There should be more directions...but ther are not. Get over it!",
        "There should be more directions...but ther are not. Get over it!",
        "There should be more directions...but ther are not. Get over it!",
        "There should be more directions...but ther are not. Get over it!"
      ]
    }
  ];

  /*
  $scope.$watch('selectedrecipe.ingredients', function() {
      $scope.selectedrecipe.ingredients = convertIngredients($scope.selectedrecipe.ingredients);
  });
  */

  $scope.newRecipe = function() {
    console.debug("New recipe was clicked");
    $scope.editing = true

    $scope.selectedRecipe = {};
    $scope.selectedRecipeIndex = $scope.recipes.length;
    $("[name='title']").val("");
    $("[name='ingredients']").val("");
    $("[name='directions']").val("");
    $
  }

  $scope.editRecipe = function(recipe) {
    console.debug("Edit was clicked for index.");
    $scope.editing = true;

    $scope.selectedRecipe = recipe;
    $scope.selectedRecipeIndex = $scope.recipes.indexOf(recipe);
    console.debug($scope.recipes.indexOf(recipe));

    $("[name='ingredients']").val(expandIngredients($scope.selectedRecipe.ingredients));
    $("[name='directions']").val(expandDirections($scope.selectedRecipe.directions))
  }

  $scope.cancelEditing = function() {
    console.debug("Cancel was clicked.");
    $scope.editing = false;
  }

  $scope.saveRecipe = function() {
    console.debug("Save was clicked.");
    $scope.editing = false;

    var rawIngredients = $("[name='ingredients']").val();
    var rawDirections = $("[name='directions']").val();
    console.debug(rawIngredients);
    $scope.selectedRecipe.ingredients = convertIngredients(rawIngredients);
    $scope.selectedRecipe.directions = convertDirections(rawDirections);
    $scope.recipes[$scope.selectedrecipeIndex] = $scope.selectedrecipe;
  }

})
.directive('navbar', function($compile) {
  return {
    restrict: 'E',
    templateUrl: 'navBar.html'
  };
})

.directive('editor', function($compile) {
  return {
    restrict: 'E',
    templateUrl: 'editor.html'
  }
})

.filter('expandingredients', function() {
  return function(input) {
    return expandIngredients(input);
  };
})

.filter('expanddirections', function() {
  return function(input) {
    return expandDirections(input);
  }
})

// Input: Ingredients array (Name + Quantity)
// Output: String formatted ingredients for text area
function expandIngredients(ingredientsArray) {
  if (typeof ingredientsArray !== 'undefined'){
    var output = "";
    for(i=0;i<ingredientsArray.length;i++){
      output += "* " + ingredientsArray[i].name + " - " + ingredientsArray[i].quantity + "\n";
      //console.debug(output);
    }
    return output;
  }
  return "";
}

// Input: Ingredients string from text area
// Output: Ingredients array (Name + Quantity)
function convertIngredients(rawIngredients) {
    //console.debug(rawIngredients);

    var ingredients = rawIngredients.split("\n");
    var arr = [];
    for (i=0;i<ingredients.length;i++){
      var ingredient = {};
      var temp = ingredients[i].split(" - ");
      ingredient.name = temp[0].substring(2);
      ingredient.quantity = temp[1];
      if (typeof ingredient.quantity !== 'undefined'){
        arr.push(ingredient);
      }
    }

    console.debug(arr);
    return arr;
}

function expandDirections(directionsArray) {
  if (typeof directionsArray !== 'undefined'){
    var output = "";
    for(i=0;i<directionsArray.length;i++){
      output += i+1+". " + directionsArray[i] + "\n";
      //console.debug(output);
    }
    return output;
  }
  return "";
}

function convertDirections(rawDirections) {
  var directions = rawDirections.split("\n");
  //console.debug(directions);
  var arr = [];
  for (i=0;i<directions.length;i++){
    directions[i] = directions[i].substring(2);
    if (directions[i] !== ''){
      arr.push(directions[i]);
    }
  }

  console.debug(arr);
  return arr;
}
