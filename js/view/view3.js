
var View3 = function (container, model) {
	this.getDish = container.find(".mat");
	this.search = container.find("#search_create_new");


	model.addObserver(this);

	this.update = function(obj) {
	}

	//View 3 där småkvadraterna raddas upp för main, starter lr dessert!
	this.showDishes = function(type) {
		var list = [];
		var kategori = model.getAllDishes(type);
		var dish = "";
		for (var i=0; i<kategori.length; i++){
			dish +="<div class='kvadrat'><button class ='dishButton' id='" + kategori[i].id + "'><img src='images/" + kategori[i].image + "' class='bild'></button><div class='dishname'>" + kategori[i].name + "</div>Lorem ispum dolor</div>";
			this.getDish.html(dish);

			var nummer = kategori[i].id;
			list.push(nummer);
			}

		//for (var i = 0; i<list.length; i++){
			//var idDish = list[i];
			
			//var pointer = "pointer" + i;
			//this.pointer = container.find("#" + idDish);
		}
		return list;
		
	}
}

