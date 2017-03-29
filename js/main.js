/* Javascript goes here! */

$(function(){
 var apiUrl = 'http://api.openweathermap.org/data/2.5/weather',
      apiKey = '9f7fe3b0ceb0a7cf1e86812469152bc0';


  function getWeatherData(city){
      var getWeather = $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        data: {
          q: city,
          appid: apiKey,
          units: 'imperial'
          }
      });

      getWeather.done(function(response){
        console.log(response);
        var city = response.name,
          temperature = response.main.temp,
          humidity = response.main.humidity,
          description = response.weather[0].description;
          var icon = response.weather[0].icon;
          var flags = response.sys.country;
    $('.icon').html('<img src="http://openweathermap.org/img/w/' + icon + '.png"/>');
    $('.flag-icon').html('<img src="../flag-icon-css-master/flags/1x1/' + flags + '.svg"/>');

          console.log(city, temperature, humidity)

          // Put API response on page
          $('.results .results-city').text(city);
          $('.temperature-container .temperature').text(temperature + '°');
          $('.humidity-container .humidity').text(humidity + '%');
          $('.description-container .description').text(description);
      });
      getWeather.fail(function(error){
        console.log($('this').find('p').text());
      });
      getWeather.always(function(){

      });
    }

  function setHandlers(){
      $('.getWeatherData').on('submit', function(e){
        e.preventDefault();
      var city = $(this).find('.weather-city').val();
      console.log(city);
      getWeatherData(city);
      });
  }

/* Flow of Web APP */
  function main(){
    getWeatherData('Austin');
    setHandlers();
  }

  main();
});
