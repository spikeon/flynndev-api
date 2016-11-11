(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-84279981-1', 'auto');
ga('send', 'pageview');

var apiUrl = "http://flynndev.us:44562/";

$(function() {

    // This is where the JS for my site will live
	$.get(apiUrl + 'experience', function(data){
		$exp = $('.exp');
		var smallest = 2002;
		for(var i in data){
			if(data.year < smallest) smallest = data.year;
		}
		var max = new Date().getFullYear() - smallest;
		for(var i in data){
			var exp = data[i];
			var value = new Date().getFullYear() - exp.year;
			$exp.append(
				$("<div>").append(
					$("<h4>",{text:exp.name}).append(
						$("<span>", {text: value + " Years", class: "float-xs-right"})
					)
				).append(
					$("<progress class='progress progress-striped progress-info' value='" + value + "' max='" + max + "'></progress>")
				)
			);
		}
	}, 'json');

});
