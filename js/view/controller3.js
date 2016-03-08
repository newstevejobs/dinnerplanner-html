var Controller3 = function(view, model ) {
	//när sidan skapas, dvs appitixers visas.
	model.getAllDishes($('select').val());

	//funktion som väntar in ett click på någon av bilderna/rätterna/knapparna.
	this.selectedDishes = function(){
		view.buttons.click(function(){
			$("#view3").hide();
			$("#view4").show();
			model.setCurrentDishID(this.getAttribute("id"));
			//för att det skall view4 skall visas med rätt rätt
			var valdRatt = model.getCurrentDishID();
			model.getDish(valdRatt);
		});
	}
	
	//om dropdownen får nytt värde; main, appitazier, dessert
	$('select').change(function(){
		model.getAllDishes($('select').val());
	});

	//searchknappen trycks in med ett sökord
	view.search.click(function() {
		var filter = $("#search").val();
		var typen = $('select').val();
		model.getAllDishes(typen, filter);
	});

	//skapar nästa views och controllers.
	var view4 = new View4($("#view4"), model);
	window.controller4 = new Controller4(view4, model);



}