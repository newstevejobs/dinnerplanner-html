var View2 = function (container, model) {
	this.plusButton = container.find("#rek1");
	this.minusButton = container.find("#rek2");
	this.numberOfGuests = container.find(".numberOfGuests");
	this.fullMenu = container.find(".titta");
	this.totalMenuPrice = container.find("#totalMenuPrice");
	this.confirmDinner = container.find("#confirm_dinner");
	this.removeButton = container.find(".remove");

	this.totalMenuPrice.html(model.getTotalMenuPrice());
	this.numberOfGuests.html(model.getNumberOfGuests());



	model.addObserver(this);

	this.update = function(Object) {
		this.numberOfGuests.html(model.getNumberOfGuests());
		this.totalMenuPrice.html(model.getTotalMenuPrice());
		this.showMenu();
		}

	this.showMenu  = function() {
		var menutext = model.getFullMenu();
		var menu = "";
		if (menutext.length == 0) {
			menu = "";
			this.fullMenu.html(menu);
		} else {
		for (var i=0; i<menutext.length; i++){
			var price = Math.round(model.getDishPrice(menutext[i]));
			menu +="<div class='row'><div class='col-md-1'><button class='remove' id='" + menutext[i].RecipeID + "'>X</button></div><div class='col-md-4'>" + menutext[i].Title + "</div><div class='col-md-3'>" + price + "x" + model.getNumberOfGuests() + "</div><div class='col-md-3 ri'>" + price * model.getNumberOfGuests() + "</div></div>";
			this.fullMenu.html(menu);
		}
		this.removeButton = container.find(".remove");
		controller2.removeDish();
		}
		}

	this.update();
}