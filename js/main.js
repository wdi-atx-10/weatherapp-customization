/* Javascript goes here! */
//http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1
//https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Eiffel+Tower,Paris+France
$(function(){

	var apiurl = "http://api.openweathermap.org/data/2.5/weather",
	 apikey = "9f7fe3b0ceb0a7cf1e86812469152bc0",
	 mapurl = "https://www.google.com/maps/embed/v1/place",
	 mapkey = "AIzaSyCUhwdslP9aJpaJMDUIDaVnsueRpOzQOac";
	
	function getweatherdata(city){
		var getweather = $.ajax({
			method:"GET",
			dataType: "json",
			appid:apikey,
			url: apiurl,
			data:{
				q: city,
				appid: apikey,
				units: "imperial"
			},

		});

		getweather.done(function(response){
			console.log(response);
			var city = response.name;
			var temperature = (response.main.temp);
			var humidity = (response.main.humidity);
			var description = response.weather[0].description;
			var icon = response.weather[0].icon;
			$('.results .results-city').text(city);
			$('.temperature-container .temperature').text(temperature);
			$('.humidity-container .humidity').text(humidity);
			$('.description-container .description').text(description);
			//<img src="pic_mountain.jpg"
			$('.weathericonpic').attr('src', 'http://openweathermap.org/img/w/' + icon + '.png')
		});
		getweather.done(function(error){
		});
	}


	function sethandlers(){
		$('.getWeatherData').on('submit', function(e){
			var city = $(this).find(".weather-city").val();
			e.preventDefault();
			getweatherdata(city);
//			getmapdata(city);
			$('iframe').attr("src", "https://www.google.com/maps/embed/v1/search?key=AIzaSyCUhwdslP9aJpaJMDUIDaVnsueRpOzQOac&q="+city);
		});
	}

	function main(){
		getweatherdata("Austin");
//		getmapdata("Austin")
		sethandlers();
	}

	main();

});