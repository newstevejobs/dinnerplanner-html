// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {
    // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details

//TODO Lab 2 implement the data structure that will hold number of guest
  // and selected dinner options for dinner menu
  this.guests = 5;    //attribut till klassen som har värdet gäster
  this.currentDishID = 1; //ID för den aktuella rätten
  this.cdo = ["hej"];
  this.selectedMenu = []; //lista med valda rätter
  this.searchTerm = "";
  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'sV1fPGQKrO0b6oUYb6w9kLI8BORLiWox'});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'sV1fPGQKrO0b6oUYb6w9kLI8BORLiWox'});


  this.setCurrentDishObject = function(object){
    this.cdo = this.getCurrentDishObject();
    var nylista = this.cdo.splice(1,1);
    nylista.push(object);
    this.cdo = nylista;
  }

  this.getCurrentDishObject = function(){
    return this.cdo;
  }

  this.setNumberOfGuests = function(num) {
    //TODO Lab 2. 
    this.guests = num; //ändrar värdet på guest till indatan.
  }

  // should return 
  this.getNumberOfGuests = function() {
    //TODO Lab 2
    return this.guests; //returnerar värdet gäster
  }

  this.setCurrentDishID = function(id) {
    this.currentDishID = id; //ändrar värdet till indatan.
  }

  // should return 
  this.getCurrentDishID = function() {
    return this.currentDishID; //returnerar värdet 
  }

  //Returns the dish that is on the menu for selected type 
  this.getSelectedDish = function(type) {
    //TODO Lab 2
    var dishType = [];
    var menuDishes = this.getFullMenu();
    for(i in menuDishes){
      if (menuDishes[i].type == type) {
        dishType.push(menuDishes[i]);
      }
    }
    return dishType;
  }

  //Returns all the dishes on the menu.
  this.getFullMenu = function() {
    //TODO Lab 2
    return this.selectedMenu;
  }

  //Returns all ingredients for all the dishes on the menu.
  /*this.getAllIngredients = function() {
    //TODO Lab 2
    allIngredients = [];
    var allDishes = this.getFullMenu();
    for (mealnr in allDishes){
      for (ingri in allDishes[mealnr].ingredients){
        allIngredients.push(allDishes[mealnr].ingredients[ingri]);
        //nu läggs namnet på ingrediensen in, om man tar  bort .name så blir det objektet.
      }
    }
    return allIngredients;
  }*/

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function() {
    //TODO Lab 2
    var guests = this.getNumberOfGuests();
    var menu = this.getFullMenu();
    var totalCost = 0;
    for (dish in menu) { //itererar genom alla ingredienser på menyn (objekt), och adderar priset till totalCost
      dishPrice = this.getDishPrice(menu[dish]);
      totalCost += dishPrice;
      } 
    total = Math.round(totalCost*guests); //multiplicerar totalCost med antalet gäster
    return total;
  }

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  this.addDishToMenu = function(obj) {
    //TODO Lab 2 
    var menuDishes = this.getFullMenu();
    for (dish in menuDishes){
      if(menuDishes[dish].Category == obj.Category){
        this.removeDishFromMenu(menuDishes[dish]);
      }
    }
    this.selectedMenu.push(obj);
  }

  //Removes dish from menu
  this.removeDishFromMenu = function(object) {
    //TODO Lab 2
    var menuDishes = this.getFullMenu();
    for(i in menuDishes){
      if(menuDishes[i].RecipeID == object.RecipeID) {
        menuDishes.splice(i,1);
      }
    }
  }

  this.removeDish = function(id){
    var menuDishes = this.getFullMenu();
    for (i in menuDishes){
      if(menuDishes[i].RecipeID == id){
        this.removeDishFromMenu(menuDishes[i]);
      }
    }
  }
  //function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
  //you can use the filter argument to filter out the dish by name or ingredient (use for search)
  //if you don't pass any filter all the dishes will be returned

  //Returns the price of the dish (all the ingredients multiplied by number of guests).
  this.getDishPrice = function(object) {
    var dish = object;
    var dishCost = 0;
    for (i in dish.Ingredients) { //itererar genom alla ingredienser på rätte (objekt), och adderar priset till totalCost
      dishCost += dish.Ingredients[i].Quantity;
      } 
    return dishCost;
  }

  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});