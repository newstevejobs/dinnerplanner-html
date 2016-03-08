//Controller Object constructor
var Controller2 = function(view, model ) {
	view.plusButton.click(function(){
	model.setNumberOfGuests(model.getNumberOfGuests() + 1);
	//för att det skall gå att ändra antal gäster när man är inne på en rätt
	var valdRatt = model.getCurrentDishID();
	model.getDish(valdRatt);
	});

	view.minusButton.click(function(){
	model.setNumberOfGuests(model.getNumberOfGuests() - 1);
	//för att det skall gå att ändra antal gäster när man är inne på en rätt
	var valdRatt = model.getCurrentDishID();
	model.getDish(valdRatt);
	});

	$("#confirm_dinner").prop("disabled",true); //TO DISABLE "CONFIRM DINNER"
	
	var view5 = new View5($("#view5"), model);
	var controller5 = new Controller5(view5, model);

	view.confirmDinner.click(function(){
		$("#view2").hide();
		$("#view3").hide();
		$("#view4").hide();
		$("#view5").show();
		view.update();
	});

	this.removeDish = function() {

	view.removeButton.click(function(){
				model.removeDish(this.getAttribute("id"));
				view.update();
			});
		}

}