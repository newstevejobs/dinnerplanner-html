//Controller Object constructor
var Controller5 = function(view, model ) {
	var view6 = new View6($("#view6"), model);
	var controller6 = new Controller6(view6, model);

	view.printButton.click(function(){
		$("#view5").hide();
		$("#view6").show();
	});

	view.goBackButton.click(function() {
		$("#view5").hide();
		$("#view3").show();
		$("#view2").show();
	})
}