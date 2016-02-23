var Controller3 = function(view, model ) {

	var list = view.showDishes($('select').val());
	


	$('select').change(function(){
		list = view.showDishes($('select').val());
		createListeners(list.length);
	});
	
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