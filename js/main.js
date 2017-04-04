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
        units: 'imperial',
        icon: 'http://openweathermap.org/img/w/' + icon + '.png'



      }
    });

    getWeather.done(function(response){
      console.log(response);
      var city = response.name;
      var temperature = response.main.temp;
      var humidity = response.main.humidity;
      var icon = response.weather[0].icon;


      console.log(city, temperature, humidity);

      // Put API response on the page
      $('.results .results-city').text(city);
      $('.temperature-container .temperature').text(temperature + 'º');
      $('.humidity-container .humidity').text(humidity + '%');
      $('.description-container .description').html('<img src="http://openweathermap.org/img/w/' + icon + '.png">');
      $('.weather-icon').attr('img','http://openweathermap.org/img/w/'+icon+'.png');
    });

    getWeather.fail(function(error){
      alert('This is not a city!', error);
      $('.city-error').attr('style','block');
    });

    // always
    getWeather.always(function(){});
  }

  function setHandlers(){
    $('.getWeatherData').on('submit',function(e){
      e.preventDefault();
      var city = $(this).find('.weather-city').val();
      getWeatherData(city);
    });
  }

  /* Flow of our webapp */
  function main(){
    getWeatherData('Austin');
    setHandlers();
  }

  main();
});
