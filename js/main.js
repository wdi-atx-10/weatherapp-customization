/* Javascript goes here! */
console.log('main.js loaded');

// api.openweathermap.org/data/2.5/weather?q={city name},{country code}
$(function () {  //document ready shorthand

  var apiUrl = 'http://api.openweathermap.org/data/2.5/weather',
    apiKey = '9f7fe3b0ceb0a7cf1e86812469152bc0',
    unit = 'imperial';

  function getWeatherData(city) {
    var getWeather = $.ajax({
      url: apiUrl,
      method: 'GET',
      dataType: 'json',
      data: {
        q: city,
        units: unit,
        appid: apiKey
      }
    });

    getWeather.done(function (response) {
      $('.city-error').hide();
      console.log(response);
      var city = response.name,
        temperature = response.main.temp,
        humidity = response.main.humidity,
        description = response.weather[0].description,
        icon = 'http://openweathermap.org/img/w/'+ response.weather[0].icon + '.png',
        country = response.sys.country;
      console.log(city, temperature, humidity, icon, country)

// place api response on the page
      $('.flag-icon .country').html('<img src = "'+country+'" />');
      $('.results .results-city').text(city);
      $('.temperature-container .temperature').text(temperature + 'º');
      $('.humidity-container .humidity').text(humidity + '%');
      $('.description-container .description').text(description);
      $('.icon-container .icon').html('<img src="'+icon+'" />');
    });

    getWeather.fail(function (error){
      $('.city-error').show();
    });

    getWeather.always(function () {

    });
  }

  function setHandlers() {
    $('.getWeatherData').on('submit', function (e) {
      e.preventDefault();
      var city = $(this).find('.weather-city').val();
      console.log(city);
      getWeatherData(city);
    });
  }
// flow of the web app
  function main() {
      getWeatherData('Austin');
      setHandlers();
  }

  main();

});
