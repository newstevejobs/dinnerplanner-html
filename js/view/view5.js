var View5 = function (container, model) {
	this.goBackButton = container.find("#go_back");
	this.printButton = container.find("#print");
	this.numberOfGuests = container.find(".numberOfGuests");
	this.fullMenu = container.find(".titta2");
	this.totalMenuPrice = container.find("#totalMenuPrice");
	this.dishPrice = container.find("#dishPrice");

	model.addObserver(this);

	this.update = function(obj) {
		this.numberOfGuests.html(model.getNumberOfGuests());
		this.showMenu();
		this.totalMenuPrice.html(model.getTotalMenuPrice());
	}

	this.showMenu = function() {
		//view5 med menyn men tre bilder; förrätt, main o dessert
		var menu = model.getFullMenu();
		var food = "";
		var price = "";
		if (menu.length == 0) {
			food = "";
			price = "";
			this.fullMenu.html(food);
			this.dishPrice.html(price);
		} else {
		for (var i=0; i<menu.length; i++){
			food +="<div class='kvadrat'><img src='images/" + menu[i].image + "' class='bild'><div class='dishname5'>" + menu[i].name + "</div></div>";
			this.fullMenu.html(food);
			price += "<div class='undertext5' id='prices'>" + model.getDishPrice(menu[i].id)*model.getNumberOfGuests() + "kr</div>";
			this.dishPrice.html(price);
		}
		}
	}
	
	this.showMenu();
	this.numberOfGuests.html(model.getNumberOfGuests());
	this.totalMenuPrice.html(model.getTotalMenuPrice());
}