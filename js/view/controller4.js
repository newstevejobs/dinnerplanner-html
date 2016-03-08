//Controller Object constructor
var Controller4 = function(view, model ) {
	//hämtar hem rätten som användaren tryckt på och skall visa dess info mha. getDish()


	view.backButton.click(function(){
		$("#header").show();
		$("#view2").show();
		$("#view3").show();
		$("#view4").hide();
	});

	view.confirmButton.click(function(){
		model.addDishToMenu();
		$("#confirm_dinner").prop("disabled",false); //TO ENABLE "CONFIRM DINNER"
		$("#view4").hide();
		$("#view3").show();		
	});
}