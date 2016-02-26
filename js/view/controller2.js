//Controller Object constructor
var Controller2 = function(view, model ) {
	view.plusButton.click(function(){
	model.setNumberOfGuests(model.getNumberOfGuests() + 1);
	});

	view.minusButton.click(function(){
	model.setNumberOfGuests(model.getNumberOfGuests() - 1);
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
				model.removeDishFromMenu(this.getAttribute("id"));
				view.update();
			});
		}

}