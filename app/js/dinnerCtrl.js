// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

  // FULL MENU!!!
  $scope.menu = Dinner.getFullMenu();

  $scope.getFullMenu = function(){
    return Dinner.getFullMenu();
  }


  // PRICE !!

  //en rätt
  try{
    $scope.getDishPrice = function(obj){
    return Dinner.getDishPrice(obj);
  }
	}
catch (err){
}

  //alla rätter på den valda menyn.
  try{
  $scope.getTotalMenuPrice = function(){
    return Dinner.getTotalMenuPrice();
  };
}
  catch(err){
  }


//ta bort rätter från menyn.
try{
$scope.removeDishFromMenu= function (obj){
  Dinner.removeDishFromMenu(obj);
};
}
catch (err){
  console.log(err);
}


});