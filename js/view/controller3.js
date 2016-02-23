var Controller3 = function(view, model ) {
	view.showDishes($('select').val());
	


	$('select').change(function(){
		view.showDishes($('select').val());
	});



	view.search.click(function() {
		view.searchDishes();
		});




	this.showNew = function() {
	view.buttons.click(function(){
				$("#view3").hide();
				$("#view4").show();
				model.setCurrentDishID(this.getAttribute("id"));
			});
		}

	

	this.showNew();

}