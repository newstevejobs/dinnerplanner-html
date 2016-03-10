// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {
    // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details

//TODO Lab 2 implement the data structure that will hold number of guest
  // and selected dinner options for dinner menu

  this.guests = $cookieStore.get('guests');    //attribut till klassen som har värdet gäster

  this.selectedMenu = [];//lista med valda rätter
  this.currentDishID = 1; //ID för den aktuella rätten
  this.cdo = ["hej"];
  var check = true;
  this.searchTerm = "";
  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'3stL5NVP4s6ZkmK5gt4dci8a4zOQRpD4'});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'3stL5NVP4s6ZkmK5gt4dci8a4zOQRpD4'});


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
    $cookieStore.put('guests',num);
  }

  // should return 
  this.getNumberOfGuests = function() {
    //TODO Lab 2
    var guests = $cookieStore.get('guests');
    return guests;
  }

  this.setCurrentDishID = function(id) {
    this.currentDishID = id; //ändrar värdet till indatan.
  }

  // should return 
  this.getCurrentDishID = function() {
    return this.currentDishID; //returnerar värdet 
  }

  //Returns all the dishes on the menu.
  this.getFullMenu = function() {
    var cookieList = $cookieStore.get('menu');
    var fullMenu = [];
    if (check) {
      check = false;
    for (i in cookieList) {
         this.Dish.get({id:cookieList[i]},function(data){
           fullMenu.push(data);
         });
       };
       this.selectedMenu = fullMenu;
  }
    return this.selectedMenu;
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

    var cookieList = [];
    for (i in this.selectedMenu){
      cookieList.push(this.selectedMenu[i].RecipeID);
    }
    $cookieStore.put('menu',cookieList);

  }

  //Removes dish from menu
  this.removeDishFromMenu = function(object) {
    //TODO Lab 2
    var menuDishes = this.getFullMenu();
    var cookieList = [];
    for(i in menuDishes){
      if(menuDishes[i].RecipeID == object.RecipeID) {
        menuDishes.splice(i,1);
      }
      else{
        cookieList.push(menuDishes[i].RecipeID);
      }
    }
    $cookieStore.put('menu',cookieList);
  }

  this.removeDish = function(id){
    var menuDishes = this.getFullMenu();
    for (i in menuDishes){
      if(menuDishes[i].RecipeID == id){
        this.removeDishFromMenu(menuDishes[i]);
      }
    }
  }



  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function() {
    //TODO Lab 2
    try{
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
  catch(err){
    var total = 0;
    return total;
  }
  }

  //Returns the price of the dish (all the ingredients multiplied by number of guests).
  this.getDishPrice = function(obj) {
    try{
    var dishCost = 0;
    for (i in obj.Ingredients) { //itererar genom alla ingredienser på rätte (objekt), och adderar priset till totalCost
      dishCost += obj.Ingredients[i].Quantity;
      } 
      var cost = Math.round(dishCost);
    return cost;
  }
  catch(err){}

  }

  this.getIngriPrice = function(ingri) {
    try{
    var IngriCost = ingri.Quantity * this.getNumberOfGuests();
    var cost = Math.round(IngriCost);
    return cost;
  }
  catch(err){}

  }






  return this;

});