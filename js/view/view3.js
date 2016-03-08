
var View3 = function (container, model) {
	this.getDish = container.find(".mat");
	this.search = container.find("#search_create_new");
	model.addObserver(this);


	this.update = function(obj) {
	try{
		var kategori = obj;
		var dish = "";
		for (var i=0; i<kategori.length; i++){
			dish +="<div class='kvadrat'><button class ='dishButton' id='" + kategori[i].RecipeID + "'><img src='" + kategori[i].ImageURL + "' class='bild'></button><div class='dishname'>" + kategori[i].Title + "</div>" + kategori[i].Subcategory + "</div>";
			this.getDish.html(dish);
			
		}
		this.buttons = container.find(".dishButton");
		controller3.selectedDishes();
	
	}
	catch(err){}

	
	//View 3 där småkvadraterna raddas upp för main, starter lr dessert!
	/*this.showDishes = function(type) {
		var kategori = model.getAllDishes(type);
		var dish = "";
		for (var i=0; i<kategori.length; i++){
			dish +="<div class='kvadrat'><button class ='dishButton' id='" + kategori[i].id + "'><img src='images/" + kategori[i].image + "' class='bild'></button><div class='dishname'>" + kategori[i].name + "</div>Lorem ispum dolor</div>";
			this.getDish.html(dish);
		}

	this.buttons = container.find(".dishButton");
	}

	this.searchDishes  = function() {
		model.searchTerm = $("#search").val();
		console.log(model.searchTerm);
		var list = model.getAllDishes($('select').val(), model.searchTerm);
		console.log(list);
		var dish = "";
		for (i=0; i<list.length; i++){
			dish +="<div class='kvadrat'><button class ='dishButton' id='" + list[i].id + "'><img src='images/" + list[i].image + "' class='bild'></button><div class='dishname'>" + list[i].name + "</div>Lorem ispum dolor</div>";
			this.getDish.html(dish);
		}
		this.buttons = container.find(".dishButton");	
	}

	//this.update();*/
	}
}

