//DinnerModel Object constructor
var DinnerModel = function() {
 
	//TODO Lab 2 implement the data structure that will hold number of guest
	// and selected dinner options for dinner menu
	this.guests = 4; 		//attribut till klassen som har värdet gäster
	this.currentDishID = 1; //ID för den aktuella rätten
	var cdo = ["hej"];
	this.selectedMenu = []; //lista med valda rätter
	var obsArray = [];
	this.searchTerm = "";

	this.addObserver = function(observer) {
		obsArray.push(observer);
		return obsArray;
	}

	var notifyObservers = function(Object) {
		for (i in obsArray) {
			obsArray[i].update(Object);
		}
	}

	var setCurrentDishObject = function(object){
		cdo = getCurrentDishObject();
		nylista = cdo.splice(1,1);
		nylista.push(object);
		cdo = nylista;
	}

	var getCurrentDishObject = function(){
		return cdo;
	}

	this.setNumberOfGuests = function(num) {
		//TODO Lab 2. 
		this.guests = num; //ändrar värdet på guest till indatan.
		notifyObservers(Object);
	}

	// should return 
	this.getNumberOfGuests = function() {
		//TODO Lab 2
		return this.guests; //returnerar värdet gäster
	}

	this.setCurrentDishID = function(id) {
		this.currentDishID = id; //ändrar värdet på guest till indatan.
		notifyObservers();
	}

	// should return 
	this.getCurrentDishID = function() {
		return this.currentDishID; //returnerar värdet gäster
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
	this.addDishToMenu = function() {
		//TODO Lab 2 
		var menuDishes = this.getFullMenu();
		var dishToAdd = cdo;
		for (dish in menuDishes){
			if(menuDishes[dish].Category == dishToAdd[0].Category){
				this.removeDishFromMenu(menuDishes[dish]);
			}
		}
		this.selectedMenu.push(dishToAdd[0]);
		notifyObservers();
	}

	//Removes dish from menu
	this.removeDishFromMenu = function(object) {
		//TODO Lab 2
		var menuDishes = this.getFullMenu();
		for(i in menuDishes){
			if(menuDishes[i].RecipeID == object.RecipeID) {
				menuDishes.splice(i,1);
			}
			notifyObservers();
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

	this.ajaxFunction = function (type, filter){
		var bas = "http://api.bigoven.com/recipes?api_key=";
		var nyckel = "H9n1zb6es492fj87OxDtZM9s5sb29rW3";
		var antalSok = "&pg=1&rpp=50&any_kw=";
		try{
			filter.length; //eftersom att undefined inte har någon längd.
			var sokOrd = filter;
		}

		catch(err){ //om det endast är typen vi vill söka på.
			var sokOrd = type;	
		}
		url = bas + nyckel + antalSok + sokOrd;	

		$.ajax({
        	type: "GET",
         	dataType: 'json',
         	cache: false,
         	url: url, 
         	beforeSend: function(){
         		$(".mat").hide();
         		$("#loadingDishes").show();
         		$("#loadingDishes").html("I can hear your stomach all the way from here...yummi yummi!");
         	},
       		success: function (data) {
       			window.info = data.Results;
				notifyObservers(data.Results);
            },
         	complete: function(){
         		if (info.length == 0){
         			$(".mat").hide();
            		$("#loadingDishes").show();
            		$("#loadingDishes").html("yummi yummi you too hungry, get your spelling together and write something eatable!");
         		}
            	else{
            		$("#loadingDishes").hide();
            		$(".mat").show();
            	}
            },

            
             error: function (jqXHR, exception) {
		        var msg = '';
		        if (jqXHR.status === 0) {
		            msg = 'Not connect.\n Verify Network.';
		        } else if (jqXHR.status == 404) {
		            msg = 'Requested page not found. [404]';
		        } else if (jqXHR.status == 500) {
		            msg = 'Internal Server Error [500].';
		        } else if (exception === 'parsererror') {
		            msg = 'Requested JSON parse failed.';
		        } else if (exception === 'timeout') {
		            msg = 'Time out error.';
		        } else if (exception === 'abort') {
		            msg = 'Ajax request aborted.';
		        } else {
		            msg = 'Uncaught Error.\n' + jqXHR.responseText;
		        }
		        alert("mep mep mep " + msg + " mep meeeeep");
		    },

         });
	};

	this.getAllDishes = function (type,filter) {
		this.ajaxFunction(type,filter);
	}

	//function that returns a dish of specific ID
	this.getDish = function (id) {
		var bas = "http://api.bigoven.com/recipe/";
		var nyckel = "?api_key=H9n1zb6es492fj87OxDtZM9s5sb29rW3";
		var antal = "&pg=1&rpp=1";
		url = bas + id + nyckel + antal;	

		$.ajax({
        	type: "GET",
         	dataType: 'json',
         	cache: false,
         	url: url,
         	success: function (data){
            	setCurrentDishObject(data);
            	notifyObservers(data);
            },
         });
	}

	//Returns the price of the dish (all the ingredients multiplied by number of guests).
	this.getDishPrice = function(object) {
		var dish = object;
		var dishCost = 0;
		for (i in dish.Ingredients) { //itererar genom alla ingredienser på rätte (objekt), och adderar priset till totalCost
			dishCost += dish.Ingredients[i].Quantity;
			} 
		Math.round(dishCost);
		return dishCost;
	}

	// the dishes variable contains an array of all the 
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name, 
	// quantity (a number), price (a number) and unit (string 
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
	var dishes = [{
		'id':1,
		'name':'French toast',
		'type':'starter',
		'image':'toast.jpg',
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		'ingredients':[{ 
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'slices',
			'price':2
			}]
		},{
		'id':2,
		'name':'Sourdough Starter',
		'type':'starter',
		'image':'sourdough.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'active dry yeast',
			'quantity':0.5,
			'unit':'g',
			'price':4
			},{
			'name':'warm water',
			'quantity':30,
			'unit':'ml',
			'price':0
			},{
			'name':'all-purpose flour',
			'quantity':15,
			'unit':'g',
			'price':2
			}]
		},{
		'id':3,
		'name':'Baked Brie with Peaches',
		'type':'starter',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':100,
		'name':'Meat balls',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
		'ingredients':[{ 
			'name':'extra lean ground beef',
			'quantity':115,
			'unit':'g',
			'price':20
			},{
			'name':'sea salt',
			'quantity':0.7,
			'unit':'g',
			'price':3
			},{
			'name':'small onion, diced',
			'quantity':0.25,
			'unit':'',
			'price':2
			},{
			'name':'garlic salt',
			'quantity':0.7,
			'unit':'g',
			'price':2
			},{
			'name':'Italian seasoning',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'dried oregano',
			'quantity':0.3,
			'unit':'g',
			'price':3
			},{
			'name':'crushed red pepper flakes',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'Worcestershire sauce',
			'quantity':6,
			'unit':'ml',
			'price':7
			},{
			'name':'milk',
			'quantity':20,
			'unit':'ml',
			'price':4
			},{
			'name':'grated Parmesan cheese',
			'quantity':5,
			'unit':'g',
			'price':8
			},{
			'name':'seasoned bread crumbs',
			'quantity':15,
			'unit':'g',
			'price':4
			}]
		},{
		'id':101,
		'name':'MD 2',
		'type':'main dish',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':15,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':10,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 3',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':2,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':10,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':5,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':103,
		'name':'MD 4',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':200,
		'name':'Chocolat Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':201,
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':202,
		'name':'Strawberry',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		}
	];

}
