var Controller3 = function(view, model ) {
	view.showDishes($('select').val());

	this.firstClick = function() {
		view.buttons.click(function(){
			$("#view3").hide();
			$("#view4").show();
			model.setCurrentDishID(this.getAttribute("id"));
			});
		}
		
	this.firstClick();

	$('select').change(function(){
		view.showDishes($('select').val());

		this.selectedDishes = function() {
			view.buttons.click(function(){
				$("#view3").hide();
				$("#view4").show();
				model.setCurrentDishID(this.getAttribute("id"));
			});
		}
		
		this.selectedDishes();

	});

	view.search.click(function() {
		view.searchDishes();

		this.searchedDishes = function() {
			view.buttons.click(function(){
				$("#view3").hide();
				$("#view4").show();
				model.setCurrentDishID(this.getAttribute("id"));
			});
		}

		this.searchedDishes();
	});

	var view4 = new View4($("#view4"), model);
	var controller4 = new Controller4(view4, model);

}