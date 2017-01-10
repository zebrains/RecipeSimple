var recipeSimple = angular.module('recipeSimple', []);

recipeSimple.controller('recipeController', function recipeController($scope) {
  $scope.editing = false;


  $scope.selectedRecipe = {};
  $scope.selectedRecipeIndex = null;

  $scope.rawIngredients = "";

  $scope.recipes = [
    {
      name: 'Joe Jost\'s Pickled Eggs',
      ingredients: [
          {
            name: "Hard-Boiled Eggs",
            quantity: "12 Eggs"
          },
          {
            name: "Water",
            quantity: "6 Cups"
          }
      ]
    },
    {
      name: 'Chicken Soup',
      ingredients: [
        {
          name: "Chicken",
          quantity: "1.5 pounds"
        },
        {
          name: "Water",
          quantity: "7 cups"
        }
      ]
    }
  ];

  /*
  $scope.$watch('selectedrecipe.ingredients', function() {
      $scope.selectedrecipe.ingredients = convertIngredients($scope.selectedrecipe.ingredients);
  });
  */

  $scope.editRecipe = function(recipe) {
    console.debug("Edit was clicked for index.");
    $scope.editing = true;

    $scope.selectedRecipe = recipe;
    $scope.selectedRecipeIndex = $scope.recipes.indexOf(recipe);
    console.debug($scope.recipes.indexOf(recipe));

    $("[name='ingredients']").val($scope.selectedRecipe);
  }

  $scope.cancelEditing = function() {
    console.debug("Cancel was clicked.");
    $scope.editing = false;
  }

  $scope.saveRecipe = function() {
    console.debug("Save was clicked.");
    $scope.editing = false;

    var rawIngredients = $("[name='ingredients']").val();
    console.debug(rawIngredients);
    $scope.selectedRecipe.ingredients = convertIngredients(rawIngredients);
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
    if (typeof input !== 'undefined'){
      var output = "";
      for(i=0;i<input.length;i++){
        output += "* " + input[i].name + " - " + input[i].quantity + "\n";
        //console.debug(output);
      }
      return output;
    }
    return "";
  };
})

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
