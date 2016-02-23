var View4 = function (container, model) {
	this.numberOfGuests = container.find(".numberOfGuests");
	this.getTitleName = container.find(".titlename");
	this.getBigImg = container.find("#picspace");
	this.getTable = container.find("#ingritable");
	this.backButton = container.find("#back_button");
	this.confirmButton = container.find("#confirm_button")
	this.dishPrice = container.find("#dish_price");
	this.fullMenu = container.find(".titta");

	this.numberOfGuests.html(model.getNumberOfGuests());
	model.addObserver(this);

	this.update = function(obj) {
		this.numberOfGuests.html(model.getNumberOfGuests());
		this.showBigDish(model.getCurrentDishID());		
		this.showMenu();
	}

	this.showBigDish = function() {
		var bigDish = model.getDish(model.getCurrentDishID());
		var bigImg = "";
		bigImg += "<img src='images/" + bigDish.image + "'class='storbild'>";
		this.getTitleName.html(bigDish.name);
		this.getBigImg.html(bigImg);

		var dishIngri = bigDish.ingredients;
			var tabledata = "";
			for (var i=0; i<dishIngri.length; i++){
				tabledata += "<tr class='table'><td>" + dishIngri[i].quantity * model.getNumberOfGuests() + "</td><td>" + dishIngri[i].unit + "</td><td>"+ dishIngri[i].name + "</td><td>SEK</td><td>" + dishIngri[i].price * model.getNumberOfGuests() + "</td> </tr>";
				this.getTable.html(tabledata);
			}

		var price = model.getDishPrice(bigDish.id)*model.getNumberOfGuests();
		this.dishPrice.html(price);
	}

	this.showMenu = function() {
		var menutext = model.getFullMenu();
		var menu = "";
		for (var i=0; i<menutext.length; i++){
			var price = model.getDishPrice(menutext[i].id);
			menu +="<div class='row'><div class='col-md-4'>" + menutext[i].name + "</div><div class='col-md-4'>"+ price + " x " + model.getNumberOfGuests() +  "</div><div class='col-md-3 ri'>" + price*model.getNumberOfGuests()+"</div></div>";
			this.fullMenu.html(menu);
		}
	}

	this.pending = function() {
		
	}

	this.showBigDish(model.getCurrentDishID());
}