var View6 = function (container, model) {
	this.goBackButton = container.find("#go_back");
	this.numberOfGuests = container.find(".numberOfGuests");
	this.totalMenuPrice = container.find("#totalMenuPrice");
	this.getTitleName1 = container.find(".titlename1");
	this.getDescription = container.find(".desc");


	model.addObserver(this);

	this.update = function(obj) {
			this.showMenu();
			this.showPrep();
			this.numberOfGuests.html(model.getNumberOfGuests());
			this.totalMenuPrice.html(model.getTotalMenuPrice());
			}

	this.showMenu = function() {
		//view 6 med bilder till vänster 
		var choice1 = model.getFullMenu();
		var choicie = "";
		if (choice1.length == 0) {
			choicie = "";
			this.getTitleName1.html(choicie);
		} else {
		for (var i=0; i<choice1.length; i++){
			choicie += "<div class='rutor'><img src='" + choice1[i].ImageURL + "' class='bild1'><div class='text'><h1 id='big'>" + choice1[i].Title  + "</h1>"+ choice1[i].Description + "</div></div>";
			this.getTitleName1.html(choicie);
		}
		}
	}

	this.showPrep = function() {
		//view 6 preperations! 
		var choice2 = model.getFullMenu();
		var choicie2 = "";
		if (choice2.length == 0) {
			choicie2 = "";
			this.getDescription.html(choicie2);
		} else {
		for (var i=0; i<choice2.length; i++){
			choicie2 += "<div class='rutor'><h2 id='big'>PREPERATIONS</h2><p>" + choice2[i].Instructions + "</p></div>";
			this.getDescription.html(choicie2);
		}
		}
	}


	this.numberOfGuests.html(model.getNumberOfGuests());
	this.totalMenuPrice.html(model.getTotalMenuPrice());
	
}