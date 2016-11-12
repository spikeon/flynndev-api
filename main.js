
var apiUrl = "http://flynndev.us:44562/";

$(function() {

	$.get(apiUrl + 'experiences', function(data){
		$exp = $('.exp');
		var smallest = new Date().getFullYear();
		for(var i in data){
			if(data[i].year < smallest) smallest = data[i].year;
		}
		smallest = smallest - 1;
		var max = new Date().getFullYear() - smallest;
		for(var i in data){
			var exp = data[i];
			var value = new Date().getFullYear() - exp.year;
			var lessthan = false;
			if(value == 0){
				lessthan = true;
				value = 1;
			}
			$exp.append(
				$("<div>").append(
					$("<h5>",{text:exp.name}).append(
						$("<span>", {
							 text: 	(lessthan ? " < " : "") + value + " Year" + (value > 1 ? "s":""),
							 class: "float-xs-right"
						 })
					)
				).append(
					$("<progress>",{
						class: "progress progress-striped progress-info",
						value: value,
						max: max
					})
				)
			);
		}
	}, 'json');

});
