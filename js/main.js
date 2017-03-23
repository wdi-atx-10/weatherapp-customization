
/* Javascript goes here! */
//http://api.openweathermap.org/data/2.5/weather?q=London,uk

$(function(){
	var apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
	var apiKey = '9f7fe3b0ceb0a7cf1e86812469152bc0';


	function getWeatherData(city){
		var getWeather = $.ajax({
			url: apiUrl,
			method: 'GET',
			dataType: 'json',
			data:{
				q: city,
				units: 'imperial',
				appid: apiKey
			}
		});

		getWeather.done(function(response){
			$('.city-error').hide();
			console.log(response);
			var city = response.name;
			var temperature = response.main.temp;
			var humidity = response.main.humidity;
			var icon = response.weather[0].icon;
			var country = response.sys.country;
			var lat = response.coord.lat;
			var lon = response.coord.lon;

			console.log(city, temperature, humidity, icon, country);

			$('.results .results-city').text(city).append('<img src="http://openweathermap.org/img/w/' + icon + '.png">')
			.prepend('<img src="node_modules/flag-icon-css/flags/1x1/' + country + '.svg">');
			$('.temperature-container .temperature').text(temperature + "°");
			$('.humidity-container .humidity').text(humidity + "%");
			$('iframe').attr('src','https://www.google.com/maps/embed/v1/place?key=AIzaSyDiybiN9kenELtjEJ17NVkMcsVUxnPe8b0&q=' + lat +"," +lon);	
		});
		getWeather.fail(function(error){
			$('.city-error').show();
		});
	};

	function setHandlers(){
		$('.getWeatherData').on('submit', function(e){
			e.preventDefault();
			var city = $(this).find('.weather-city').val();
			console.log(city);

			getWeatherData(city);
		})
	};

	// flow of weather-app
	function main(){
		getWeatherData('Austin');
		setHandlers();
	};

	main();
});