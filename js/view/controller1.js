//Controller Object constructor
var Controller1 = function(view, model ) {
	


$("#header").hide();
$("#view2").hide();
$("#view3").hide();
$("#view1").show();
$("#view4").hide();
$("#view5").hide();
$("#view6").hide();


  view.welcomeButton.click(function(){

  	var view2 = new View2($("#view2"), model);
	window.controller2 = new Controller2(view2, model);

	var header = new Header($("#header"), model);
	var headerController = new HeaderController(header, model);
	
	var view3 = new View3($("#view3"), model);
	window.controller3 = new Controller3(view3, model);
	
	$("#view1").hide();
	$("#header").show();
	$("#view2").show();
	$("#view3").show();
  });

}