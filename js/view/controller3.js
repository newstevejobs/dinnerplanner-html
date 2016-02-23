var Controller3 = function(view, model ) {
	//view.showDishes("starter");
	var list = view.showDishes($('select').val());
	


	$('select').change(function(){
		list = view.showDishes($('select').val());
		console.log(list);
		firstpicture(list);
		
		//createListeners(list.length);
	});
	
	
	var firstpicture = function(list){
		var first = list[0];
		console.log(first);

		view.pointer2.click(function(){
			alert("hej");
		});

	}

	var createListeners = function(num) {
		for (var i = 0; i<num; i++){
			var pointer = 'pointer' + i;
			var id = list[i];
			view.pointer.click(function(){
				console.log(pointer);
				$("#view3").hide();
				$("#view4").show();
				model.setCurrentDishID(id);

			});
		}
	}	
	createListeners(list.length);

}