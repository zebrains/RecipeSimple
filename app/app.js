var recipieSimple = angular.module('recipieSimple', []);

recipieSimple.controller('RecipieController', function RecipieController($scope) {
  $scope.editing = false;

  $scope.selectedRecipie = {};
  $scope.selectedRecipieIndex = null;

  $scope.recipies = [
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

  $scope.editRecipie = function(recipie) {
    console.debug("Edit was clicked for index.");
    $scope.editing = true;
    $scope.selectedRecipie = recipie;
    $scope.selectedRecipieIndex = $scope.recipies.indexOf(recipie);
    console.debug($scope.recipies.indexOf(recipie));
  }

  $scope.cancelEditing = function() {
    console.debug("Cancel was clicked.");
    $scope.editing = false;
  }

  $scope.saveRecipie = function() {
    console.debug("Save was clicked.");
    $scope.editing = false;

    $scope.recipies[$scope.selectedRecipieIndex] = $scope.selectedRecipie;
  }

});
