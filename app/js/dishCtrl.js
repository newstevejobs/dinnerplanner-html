// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  //$routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
	Dinner.Dish.get({id:$routeParams.dishId},function(data){
    	$scope.cdo=data;
    	$scope.ingredients=data.Ingredients;
    	
   	},function(data){
    	$scope.status = "There was an error";
   	});

//NUMBER OF GUESTS
 $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }
  


 $scope.add = function() {
   $scope.status = "Adding dish to menu...";
   Dinner.addDishToMenu($scope.cdo);
   $scope.status = "Dish added to menu!";
   };


//EN RÄTTS PRIS
  try{
    $scope.getDishPrice = function(obj){
    return Dinner.getDishPrice(obj);
  }
	}
catch (err){
}

//EN INGREDIENTS PRIS
 try{
    $scope.getIngriPrice = function(obj){
    return Dinner.getIngriPrice(obj);
  }
	}
catch (err){
}

//HELA MENYNS PRIS
  try{
  $scope.getTotalMenuPrice = function(){
    return Dinner.getTotalMenuPrice();
  };
}
  catch(err){
  }


//FÅ HELA MENYN
$scope.menu = Dinner.getFullMenu();

  $scope.getFullMenu = function(){
    return Dinner.getFullMenu();
    } 
    
});