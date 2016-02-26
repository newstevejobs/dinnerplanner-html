$(function() {
	//We instantiate our model
	var model = new DinnerModel();

	var view1 = new View1($("#view1"), model);
	var controller1 = new Controller1(view1, model);


});